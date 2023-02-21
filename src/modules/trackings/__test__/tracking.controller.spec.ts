import fs from 'fs';
import { Readable } from 'stream';

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Express, Response } from 'express';

import {
  CreateTrackingDto,
  parseIntTransform,
} from '../dto/create-tracking.dto';
import { TrackingController } from '../tracking.controller';
import { Tracking, TrackingToken } from '../tracking.entity';
import { TrackingService } from '../tracking.service';

jest.mock('fs', () => ({
  writeFileSync: jest.fn().mockImplementation(),
}));

describe('TrackingController', () => {
  let trackingController: TrackingController;

  const mockModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
    countDocuments: jest.fn(),
    aggregate: jest.fn(),
    findById: jest.fn(),
  };

  const mockTracking: Tracking = {
    level: 2,
    submittedBy: 'quan_ne',
    image:
      '1676962068593_quan_ne_325885872_705725441148181_4676774506102890551_n.jpg',
    createdAt: new Date('2023-02-21T06:47:48.610Z'),
    updatedAt: new Date('2023-02-21T06:47:48.610Z'),
  };

  const mockedStream = new Readable();

  const file: Express.Multer.File = {
    fieldname: 'file',
    originalname: '325885872_705725441148181_4676774506102890551_n.jpg',
    encoding: '7bit',
    mimetype: 'image/png',
    buffer: Buffer.from('whatever'),
    size: 223581,
    filename: 'abc',
    path: 'abc',
    destination: 'abc',
    stream: mockedStream,
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TrackingController],
      providers: [
        TrackingService,
        {
          provide: getModelToken(TrackingToken),
          useValue: mockModel,
        },
      ],
    }).compile();

    trackingController = app.get<TrackingController>(TrackingController);
  });

  describe('root', () => {
    it('detail', async () => {
      mockModel.findById = jest.fn().mockResolvedValueOnce(mockTracking);
      expect(await trackingController.detail('someId')).toMatchObject(
        mockTracking,
      );
    });

    it('detail notFound', async () => {
      mockModel.findById = jest.fn().mockResolvedValueOnce(undefined);

      let error: unknown;
      try {
        await trackingController.detail('someId');
      } catch (err: unknown) {
        error = err;
      } finally {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('list', async () => {
      const mockTrackings: Tracking[] = [
        {
          level: 3,
          submittedBy: 'quan_ne',
          image:
            '1676962068593_quan_ne_325885872_705725441148181_4676774506102890551_n.jpg',
          createdAt: new Date('2023-02-21T06:47:48.610Z'),
          updatedAt: new Date('2023-02-21T06:47:48.610Z'),
        },
        {
          level: 2,
          submittedBy: 'quan_ne',
          image:
            '1676962068593_quan_ne_325885872_705725441148181_4676774506102890551_n.jpg',
          createdAt: new Date('2023-02-21T06:47:48.610Z'),
          updatedAt: new Date('2023-02-21T06:47:48.610Z'),
        },
      ];

      mockModel.find = jest.fn().mockResolvedValueOnce(mockTrackings);
      expect(await trackingController.list({})).toMatchObject(mockTrackings);
    });

    it('create notAllowedFile', async () => {
      const body: CreateTrackingDto = {
        level: 5,
        submittedBy: 'Abc Def',
      };

      const mockFile: Express.Multer.File = {
        ...file,
        mimetype: 'pdf',
      };

      let error: unknown;
      try {
        await trackingController.create(body, mockFile);
      } catch (err: unknown) {
        error = err;
      } finally {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });

    it('create', async () => {
      const body: CreateTrackingDto = {
        level: 5,
        submittedBy: 'Abc Def',
      };

      const mockFile: Express.Multer.File = {
        ...file,
        mimetype: 'image/jpeg',
      };

      mockModel.create = jest.fn().mockResolvedValueOnce(mockTracking);
      expect(await trackingController.create(body, mockFile)).toMatchObject(
        mockTracking,
      );
      expect(fs.writeFileSync).toBeCalledTimes(1);
    });

    it('get image', async () => {
      const mockRes = (<unknown>{
        sendFile: jest.fn(),
      }) as Response;

      const path = 'some_file';
      trackingController.sendFile(path, mockRes);
      expect(mockRes.sendFile).toHaveBeenNthCalledWith(1, path, {
        root: 'public',
      });
    });
  });

  it('parseIntTransform', () => {
    expect(
      parseIntTransform({
        value: '123',
        key: 'key',
        obj: {},
        options: {},
        type: 0,
      }),
    ).toEqual(123);
  });
});
