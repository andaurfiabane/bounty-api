import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BountyDocument = Bounty & Document;

@Schema({ timestamps: true , versionKey: false})
export class Bounty {
  @Prop({ required: true })
  cantidadBellys: number;

  @Prop({
    enum: ['Wanted', 'Captured'],
    default: 'Wanted',
  })
  estado: string;

  @Prop({ type: Types.ObjectId, ref: 'Pirate', required: true })
  pirata: Types.ObjectId;
}

export const BountySchema = SchemaFactory.createForClass(Bounty);