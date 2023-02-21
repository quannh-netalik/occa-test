import fs from 'fs';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Express } from 'express';

import { CreateTrackingDto } from './dto/create-tracking.dto';
import { Tracking, TrackingDocument, TrackingToken } from './tracking.entity';
import { QueryTrackingDto } from './dto/query-tracking.dto';

@Injectable()
export class TrackingService {
  constructor(
    @InjectModel(TrackingToken)
    private readonly trackingModel: Model<TrackingDocument>,
  ) {}

  async detail(id: string): Promise<Tracking> {
    const tracking = await this.trackingModel.findById(id);
    if (!tracking) {
      throw new NotFoundException();
    }

    return tracking;
  }

  async list(query: QueryTrackingDto): Promise<Tracking[]> {
    return this.trackingModel.find(query);
  }

  async create(
    { level, submittedBy }: CreateTrackingDto,
    file?: Express.Multer.File,
  ) {
    let path: string = '';
    if (file) {
      path = `${Date.now()}_${submittedBy}_${file.originalname}`;
      fs.writeFileSync(`./public/${path}`, file.buffer);
    }

    return this.trackingModel.create({
      level,
      submittedBy,
      image: path,
    });
  }
}
