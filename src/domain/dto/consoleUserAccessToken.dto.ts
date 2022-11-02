import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetConsoleUserAccessTokenDto {
  @IsNotEmpty()
  @IsNumber()
  consoleUserId: number;
}
