import { Body, Controller, Post, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/email')
  // loginEmail(@Body('email') email: string, @Body('password') password: string) {
  //   return this.authService.loginWithEmail({
  //     email,
  //     password,
  //   });
  // }
  loginEmail(@Headers('authorization') rawToken: string) {
    // email:password ->base64
    //asdasdasdasdasadlml(base64) -> email:password
    const token = this.authService.extractTokenFromHeader(rawToken, false);

    const credentials = this.authService.decodeBasicToken(token);

    return this.authService.loginWithEmail(credentials);
  }

  @Post('register/email')
  registerEmail(
    @Body('nickname') nickname: string,
    @Body('password') password: string,
    @Body('email') email: string,
  ) {
    return this.authService.registerWithEmail({
      nickname,
      email,
      password,
    });
  }
}
