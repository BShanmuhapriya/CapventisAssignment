import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema()
export class Appointment {
    @Field()
    @Prop({ required: true })
    id: string;

    @Field()
    @Prop({ required: true })
    firstName: string;

    @Field()
    @Prop({ required: true })
    lastName: string;

    @Field()
    @Prop({ required: true })
    email: string;

    @Field()
    @Prop({ required: true })
    gender: string;

    @Field()
    @Prop({ required: true })
    bloodgroup: string;

    @Field()
    @Prop()
    reason: string;
}

export type AppointmentDocument = Appointment & Document;
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
