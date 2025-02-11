import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema()
export class Services {
    @Field()
    @Prop({required: true})
    id: string;

    @Field()
    @Prop({required: true})
    name: string;

    @Field({ nullable: true }) 
    @Prop({ required: false }) 
    imageUrl?: string;  
}
export const ServiceSchema = SchemaFactory.createForClass(Services);
