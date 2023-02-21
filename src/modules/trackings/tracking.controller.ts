import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';

import { CreateTrackingDto } from './dto/create-tracking.dto';
import { TrackingService } from './tracking.service';
import { Tracking } from './tracking.entity';
import { QueryTrackingDto } from './dto/query-tracking.dto';

@Controller('/tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Get('/:id')
  detail(@Param('id') id: string): Promise<Tracking> {
    return this.trackingService.detail(id);
  }

  @Get('/')
  list(@Query() query: QueryTrackingDto): Promise<Tracking[]> {
    return this.trackingService.list(query);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('/')
  create(
    @Body() body: CreateTrackingDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (
      file &&
      !['image/jpg', 'image/jpeg', 'image/png'].includes(file.mimetype)
    ) {
      throw new BadRequestException('Only image allowed');
    }

    return this.trackingService.create(body, file);
  }

  @Get('img/:imgPath')
  sendFile(@Param('imgPath') imgPath: string, @Res() res: Response) {
    return res.sendFile(imgPath, { root: 'public' });
  }
}
