import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";
import { UsersService } from "../users/users.service";
import * as crypto from "crypto";

@Injectable()
export class AuthService {
  constructor(
    private readonly users:  UsersService,
    private readonly jwt:    JwtService,
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async register(email: string, password: string, name?: string) {
    const user = await this.users.create(email, password, name);
    return this.issueTokens(user.id, email);
  }

  async login(email: string, password: string, meta?: { userAgent?: string; ip?: string }) {
    const user = await this.users.validatePassword(email, password);
    if (!user) throw new UnauthorizedException("Credenciais inválidas");
    return this.issueTokens(user.id, user.email, meta);
  }

  async refresh(refreshToken: string) {
    const session = await this.prisma.session.findUnique({
      where: { refreshToken },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      throw new UnauthorizedException("Refresh token inválido ou expirado");
    }

    // Rotaciona o refresh token (evita reutilização)
    await this.prisma.session.delete({ where: { id: session.id } });
    return this.issueTokens(session.userId, session.user.email);
  }

  async logout(refreshToken: string) {
    await this.prisma.session.deleteMany({ where: { refreshToken } });
  }

  async getMe(userId: string) {
    return this.users.findById(userId);
  }

  // --- Helpers privados ---

  private async issueTokens(
    userId: string,
    email:  string,
    meta?:  { userAgent?: string; ip?: string }
  ) {
    const accessToken  = this.jwt.sign({ sub: userId, email });
    const refreshToken = crypto.randomBytes(48).toString("hex");

    const expiresAt = new Date();
    const days = parseInt(
      (this.config.get<string>("JWT_REFRESH_EXPIRES") ?? "30d").replace("d", ""),
      10
    );
    expiresAt.setDate(expiresAt.getDate() + days);

    await this.prisma.session.create({
      data: {
        userId,
        refreshToken,
        expiresAt,
        userAgent: meta?.userAgent,
        ipAddress: meta?.ip,
      },
    });

    return { accessToken, refreshToken, expiresAt };
  }
}
