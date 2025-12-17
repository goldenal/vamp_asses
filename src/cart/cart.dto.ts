import { IsNotEmpty, IsString } from 'class-validator';

export class ReserveItemDto {
  @IsString()
  @IsNotEmpty()
  userId: string; // strict: true

  @IsString()
  @IsNotEmpty()
  productId: string;
}
