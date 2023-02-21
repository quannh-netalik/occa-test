import { join } from 'path';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TrackingModule } from '~/modules/trackings/tracking.module';
import { mongooseFactory } from '~/factories/mongoose.factory';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: mongooseFactory,
    }),
    TrackingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
