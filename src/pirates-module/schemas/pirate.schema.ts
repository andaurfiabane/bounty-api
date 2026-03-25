import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PirateDocument = Pirate & Document;

@Schema({ timestamps: true, versionKey: false })
export class Pirate {
  @Prop({ required: true, unique: true, trim: true })
  nombre: string;

  @Prop({ required: true, trim: true })
  tripulacion: string;

  @Prop({ default: false })
  tieneFrutaDelDiablo: boolean;
}

export const PirateSchema = SchemaFactory.createForClass(Pirate);
