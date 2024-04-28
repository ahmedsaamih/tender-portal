import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateTenderDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: string;
}

export class Stats {
  title: string;
  count: string;
}
