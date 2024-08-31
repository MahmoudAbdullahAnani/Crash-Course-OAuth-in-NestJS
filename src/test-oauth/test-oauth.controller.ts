import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class TestOauthController {
  constructor(private readonly authService: AuthService) {}
  @Get('login')
  clientSideComponent(@Res() res: Response) {
    return res.send(`
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login Page || OAuth</title>
  </head>
        <body>
          <div>
            <a style="background:#fff; color:red"  href="http://localhost:3000/api/auth/google/login">
              <button>Login by Google</button>
            </a>
          </div>
          <form style="margin:10px" >
            <input placeholder="email..." />
            <input placeholder="password..." />
            <input type="submit" />

          </form>
        </body>
      </html>
      `);
  }

  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    return { msg: 'Google Authentication' };
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req: any, @Res() res: Response) {
    const userObj = req.user as any;
    const user = {
      userId: userObj.profile.id,
      email: userObj.profile.emails[0].value,
      name: userObj.profile.displayName,
      photo: userObj.profile.photos[0].value,
    };
    await this.authService.validateUser(user);
    return res.redirect(process.env.MAIN_CLIENT);
  }
}

@Controller('home')
export class ClientHomePage {
  @Get()
  homePage(@Res() res: Response) {
    return res.send(`
        <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Home Page || OAuth</title>
  </head>
  <body>
    <h1 style="text-align: center">اشترك في القناة يا صديقي♥♥</h1>
    <hr />
  </body>
</html>

      `);
  }
}
