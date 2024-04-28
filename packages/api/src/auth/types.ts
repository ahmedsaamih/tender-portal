import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthenticatedUser {
  id: number;
  entityId: number;
  name: string;
  type: string;
  token: string;
}

export class CredentialsDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  vendorName: string;

  @IsString()
  @IsNotEmpty()
  vendorRegistrationNo: string;
}
