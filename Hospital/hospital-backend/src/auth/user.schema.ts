import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose"; 

@ObjectType()
@Schema()
export class User {
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
    @Prop({ required: true, unique: true }) // Ensuring email uniqueness
    email: string;

    @Prop({ required: true })
    password: string; // Do not expose password in GraphQL

    @Field()
    @Prop({ required: true })
    contact: number;

    @Field()
    @Prop({ required: true })
    gender: string;

    @Field()
    @Prop({ type: MongooseSchema.Types.Date, required: true, default: Date.now }) 
    dob: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
