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

    @Field({ nullable: true }) // GraphQL field
    @Prop({ required: false }) // Mongoose field
    imageUrl?: string;  // Field to store the image URL
}
export const ServiceSchema = SchemaFactory.createForClass(Services);
