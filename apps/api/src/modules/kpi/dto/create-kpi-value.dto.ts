import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateKpiValueDto {
  @IsNumber()
  actualValue: number;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
