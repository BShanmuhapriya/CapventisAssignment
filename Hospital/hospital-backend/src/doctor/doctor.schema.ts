import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Document } from 'mongoose';

export type DoctorDocument = Doctor & Document;

@ObjectType()
@Schema()
export class Doctor {

  @Field()
  @Prop({ required: true })
  id: string;

  @Field() 
  @Prop({ required: true })
  name: string;

  @Field() 
  @Prop({ required: true })
  specialization: string;

  @Field(() => Int)
  @Prop({ required: true })
  fees: number;

  @Field(() => [AvailableSlot]) 
  @Prop({
    type: [{ date: String, slots: [String] }],
    default: [],
  })
  availableSlots: { date: string; slots: string[] }[];
}

@ObjectType() 
export class AvailableSlot {
  @Field()
  date: string;

  @Field(() => [String])
  slots: string[];
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
