import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString, IsInt } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  item: string;

  @IsNumber()
  @IsNotEmpty()
  qty: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  itemId: number;

  @IsDateString()
  @IsOptional()
  created_at?: string;
}
