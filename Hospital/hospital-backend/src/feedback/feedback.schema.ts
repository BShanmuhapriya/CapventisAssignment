import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema()
export class Feedback {
    @Field()
    @Prop({required: true})
    id: string;

    @Field()
    @Prop({required: true})
    feedback: string;

    @Field() // GraphQL field
    @Prop({ required: false }) // Mongoose field
    rating: number;  
}
export const ServiceSchema = SchemaFactory.createForClass(Feedback);
