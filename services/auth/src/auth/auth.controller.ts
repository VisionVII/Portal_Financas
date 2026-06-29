import {
  Controller, Post, Get, Body, Headers, Ip,
  UseGuards, Request, HttpCode, HttpStatus,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshDto } from "./dto/refresh.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** POST /api/auth/register */
  @Post("register")
  register(
    @Body() dto: RegisterDto,
    @Headers("user-agent") ua: string,
    @Ip() ip: string,
  ) {
    return this.authService.register(dto.email, dto.password, dto.name);
  }

  /** POST /api/auth/login */
  @Post("login")
  @HttpCode(HttpStatus.OK)
  login(
    @Body() dto: LoginDto,
    @Headers("user-agent") ua: string,
    @Ip() ip: string,
  ) {
    return this.authService.login(dto.email, dto.password, { userAgent: ua, ip });
  }

  /** POST /api/auth/refresh */
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refresh(@Body() dto: RefreshDto) {
    return this.authService.refresh(dto.refreshToken);
  }

  /** POST /api/auth/logout */
  @Post("logout")
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Body() dto: RefreshDto) {
    return this.authService.logout(dto.refreshToken);
  }

  /** GET /api/auth/me */
  @Get("me")
  @UseGuards(AuthGuard("jwt"))
  me(@Request() req: { user: { sub: string } }) {
    return this.authService.getMe(req.user.sub);
  }
}
