import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Tracking {
  @Prop({ required: true, min: 1, max: 5 })
  level!: number;

  @Prop({ required: true })
  submittedBy!: string;

  @Prop()
  image?: string;

  @Prop()
  createdAt!: Date;

  @Prop()
  updatedAt!: Date;
}

export const TrackingToken = 'trackings';

export type TrackingDocument = Tracking & Document;

export const TrackingSchema = SchemaFactory.createForClass(Tracking);
