import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { Tracking } from '../tracking.entity';

export class QueryTrackingDto extends PartialType(Tracking) {
  @IsOptional()
  @IsString()
  submittedBy?: string;
}
