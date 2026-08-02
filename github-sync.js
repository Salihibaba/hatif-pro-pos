(function () {
  const SETTINGS_KEY = "hatifProGithubSyncSettings";
  const DEFAULT_SETTINGS = {
    owner: "Salihibaba",
    repo: "hatif-pro-pos",
    branch: "main",
    path: "data/hatif-pro-data.json",
    token: ""
  };

  let saveTimer = null;
  let saveQueue = Promise.resolve();

  function normalizeSettings(settings) {
    return {
      owner: (settings.owner || "").trim(),
      repo: (settings.repo || "").trim(),
      branch: (settings.branch || "").trim() || DEFAULT_SETTINGS.branch,
      path: (settings.path || "").trim() || DEFAULT_SETTINGS.path,
      token: (settings.token || "").trim()
    };
  }

  function loadSettings() {
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }

  function saveSettings(settings) {
    const cleanSettings = normalizeSettings(settings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(cleanSettings));
    return cleanSettings;
  }

  function isConfigured(settings = loadSettings()) {
    return Boolean(settings.owner && settings.repo && settings.branch && settings.path && settings.token);
  }

  function apiUrl(settings) {
    const path = settings.path.split("/").map(encodeURIComponent).join("/");
    return `https://api.github.com/repos/${encodeURIComponent(settings.owner)}/${encodeURIComponent(settings.repo)}/contents/${path}`;
  }

  function requestHeaders(settings) {
    return {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${settings.token}`,
      "X-GitHub-Api-Version": "2022-11-28"
    };
  }

  async function buildGithubError(response, action) {
    let details = "";
    try {
      const body = await response.json();
      details = body.message ? ` - ${body.message}` : "";
    } catch {
      details = "";
    }
    return new Error(`${action}: ${response.status}${details}`);
  }

  function getReadableError(error) {
    const message = error?.message || "Unknown error";
    if (message.includes("401")) return "فشل GitHub: رمز Token غير صحيح أو منتهي.";
    if (message.includes("403")) return "فشل GitHub: Token لا يملك صلاحية Contents Read/Write.";
    if (message.includes("404")) return "فشل GitHub: المستودع أو المسار غير موجود أو لا توجد صلاحية للوصول.";
    if (message.includes("409")) return "فشل GitHub: حدث تعارض في الملف، اضغط تحميل ثم حفظ الآن.";
    return `فشل GitHub: ${message}`;
  }

  function decodeContent(content) {
    const binary = atob(content.replace(/\n/g, ""));
    const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  }

  function encodeContent(value) {
    const text = JSON.stringify(value, null, 2);
    const bytes = new TextEncoder().encode(text);
    let binary = "";
    bytes.forEach(byte => { binary += String.fromCharCode(byte); });
    return btoa(binary);
  }

  async function getRemoteFile(settings = loadSettings()) {
    if (!isConfigured(settings)) throw new Error("GitHub sync is not configured.");

    const response = await fetch(`${apiUrl(settings)}?ref=${encodeURIComponent(settings.branch)}`, {
      headers: requestHeaders(settings)
    });

    if (response.status === 404) return { sha: null, data: null };
    if (!response.ok) throw await buildGithubError(response, "GitHub load failed");

    const file = await response.json();
    return {
      sha: file.sha,
      data: file.content ? decodeContent(file.content) : null
    };
  }

  async function loadRemoteData(settings = loadSettings()) {
    const file = await getRemoteFile(settings);
    if (!file.data) return null;
    return file.data.payload || file.data;
  }

  async function saveRemoteData(payload, settings = loadSettings()) {
    if (!isConfigured(settings)) throw new Error("GitHub sync is not configured.");

    const current = await getRemoteFile(settings);
    const body = {
      message: "Sync app data",
      branch: settings.branch,
      content: encodeContent({
        version: 1,
        updatedAt: new Date().toISOString(),
        payload
      })
    };

    if (current.sha) body.sha = current.sha;

    const response = await fetch(apiUrl(settings), {
      method: "PUT",
      headers: {
        ...requestHeaders(settings),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) throw await buildGithubError(response, "GitHub save failed");
    return response.json();
  }

  function scheduleSave(payloadProvider, onStatus) {
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => {
      if (!isConfigured()) return;
      onStatus?.("جاري الحفظ التلقائي على GitHub...");
      saveQueue = saveQueue
        .catch(() => undefined)
        .then(() => saveRemoteData(payloadProvider()))
        .then(() => onStatus?.(`تمت المزامنة مع GitHub في ${new Date().toLocaleTimeString("ar")}`))
        .catch(error => {
          console.error("GitHub sync failed", error);
          onStatus?.(getReadableError(error));
        });
    }, 900);
  }

  window.phoneProGithubSync = {
    loadSettings,
    saveSettings,
    isConfigured,
    loadRemoteData,
    saveRemoteData,
    scheduleSave,
    getReadableError
  };
})();
