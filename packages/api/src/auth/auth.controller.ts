import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthenticatedUser, CredentialsDto, SignUpDto } from './types';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(
    @Body() credentialsDto: CredentialsDto,
  ): Promise<AuthenticatedUser> {
    return await this.authService.signIn(credentialsDto);
  }

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return await this.authService.signUp(signUpDto);
  }
}
