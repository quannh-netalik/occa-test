import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TrackingService } from './tracking.service';
import { TrackingController } from './tracking.controller';
import { TrackingSchema, TrackingToken } from './tracking.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: TrackingToken,
        schema: TrackingSchema,
      },
    ]),
  ],
  controllers: [TrackingController],
  providers: [TrackingService],
  exports: [],
})
export class TrackingModule {}
