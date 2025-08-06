import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MeetingDocument = Meeting & Document;

@Schema()
export class Meeting {
  @Prop({ required: true })
  userName: string;

  @Prop()
  product: string;

  @Prop({ required: true })
  date: Date;
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
