import 'app_user.dart';

abstract interface class AuthRepository {
  Stream<AppUser?> watchAuthState();
  Future<void> signInWithEmailAndPassword(String email, String password);
  Future<void> createUserWithEmailAndPassword(String email, String password);
  Future<void> signOut();
}
