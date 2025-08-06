import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BusinessDocument = Business & Document;

@Schema()
export class Business {
  @Prop({ required: true, unique: true, index: true })
  businessId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  location: string;

  @Prop()
  description: string;

  @Prop()
  website: string;

  @Prop()
  logoText: string;

  @Prop()
  logoImage: string;
}

export const BusinessSchema = SchemaFactory.createForClass(Business);
