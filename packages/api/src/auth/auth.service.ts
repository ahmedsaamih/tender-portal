import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { signJwt } from '../jwt';
import { AuthenticatedUser, CredentialsDto, SignUpDto } from './types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signIn(credentialsDto: CredentialsDto): Promise<AuthenticatedUser> {
    return await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {
          email: credentialsDto.email,
          password: credentialsDto.password,
        },
      });

      if (!user)
        throw new UnauthorizedException('Your email or password is incorrect.');

      await tx.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      });

      return {
        id: user.id,
        entityId: user.organizationId || user.vendorId,
        name: user.name,
        token: signJwt({ id: user.organizationId || user.vendorId }),
        type: user.type,
      };
    });
  }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    return await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { email: signUpDto.email },
      });

      if (user) throw new BadRequestException('User already exists.');

      return await tx.user.create({
        data: {
          name: signUpDto.name,
          email: signUpDto.email,
          password: signUpDto.password,
          type: 'vendor',
          vendor: {
            create: {
              name: signUpDto.vendorName,
              registration_no: signUpDto.vendorRegistrationNo,
            },
          },
        },
      });
    });
  }
}
