import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';

class GoogleSignInScreen extends StatefulWidget {
  @override
  _GoogleSignInScreenState createState() => _GoogleSignInScreenState();
}

class _GoogleSignInScreenState extends State<GoogleSignInScreen> {
  GoogleSignIn _googleSignIn = GoogleSignIn(
    scopes: [
      'email',
    ],
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Google Sign-In'),
        backgroundColor: Colors.blueAccent,
      ),
      body: Center(
        child: ElevatedButton(
          child: Text('Sign In with Google'),
          onPressed: () {
            _handleGoogleSignIn();
          },
        ),
      ),
    );
  }

 void _handleGoogleSignIn() async {
  try {
    final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
    final GoogleSignInAuthentication? googleAuth =
        await googleUser?.authentication;
    final String? idToken = googleAuth?.idToken;

    if (idToken != null) {
      // Lấy token ID thành công
      print('Token ID: $idToken');

      // Thực hiện các thao tác tiếp theo sau khi đăng nhập thành công
    } else {
      print('Lấy token ID thất bại: idToken là null');
    }
  } catch (error) {
    print('Đăng nhập bằng Google thất bại: $error');
  }
}


  @override
  void initState() {
    super.initState();
    _googleSignIn.onCurrentUserChanged.listen((GoogleSignInAccount? account) {
      if (account != null) {
        // Người dùng đã chọn tài khoản đăng nhập
        // Thực hiện các thao tác tiếp theo sau khi đăng nhập thành công
      }
    });
    _googleSignIn.signInSilently();
  }
}
