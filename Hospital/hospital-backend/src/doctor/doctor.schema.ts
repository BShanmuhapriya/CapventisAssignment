/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Document } from 'mongoose';

export type DoctorDocument = Doctor & Document;

@ObjectType() // Add this decorator for GraphQL
@Schema() // This is for Mongoose
export class Doctor {

  @Field()
  @Prop({ required: true })
  id: string;

  @Field() // Add this for GraphQL
  @Prop({ required: true })
  name: string;

  @Field() // Add this for GraphQL
  @Prop({ required: true })
  specialization: string;

  @Field(() => Int) // Explicitly declare the type (number)
  @Prop({ required: true })
  fees: number;

  @Field(() => [AvailableSlot]) // GraphQL field for the nested structure
  @Prop({
    type: [{ date: String, slots: [String] }],
    default: [],
  })
  availableSlots: { date: string; slots: string[] }[];
}

@ObjectType() // Define the nested object type
export class AvailableSlot {
  @Field()
  date: string;

  @Field(() => [String])
  slots: string[];
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
