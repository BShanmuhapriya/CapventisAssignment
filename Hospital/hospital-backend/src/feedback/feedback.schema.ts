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

    @Field() 
    @Prop({ required: false }) 
    rating: number;  
}
export const ServiceSchema = SchemaFactory.createForClass(Feedback);
