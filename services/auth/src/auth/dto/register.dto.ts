import { IsEmail, IsString, MinLength, IsOptional, MaxLength } from "class-validator";

export class RegisterDto {
  @IsEmail({}, { message: "E-mail inválido" })
  email: string;

  @IsString()
  @MinLength(8, { message: "Senha deve ter no mínimo 8 caracteres" })
  @MaxLength(128)
  password: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  name?: string;
}
