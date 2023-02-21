import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export const parseIntTransform = ({ value }: TransformFnParams) =>
  parseInt(value, 10);

export class CreateTrackingDto {
  @Transform(parseIntTransform)
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  level!: number;

  @IsString()
  @IsNotEmpty()
  submittedBy!: string;
}
