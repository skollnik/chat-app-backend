import { IsNotEmpty, IsString } from 'class-validator';

export class NewChatDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
