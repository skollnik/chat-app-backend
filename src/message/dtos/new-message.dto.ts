import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NewMessageDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsDate()
  timestamp: Date;

  @IsNotEmpty()
  @IsNumber()
  chatId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
