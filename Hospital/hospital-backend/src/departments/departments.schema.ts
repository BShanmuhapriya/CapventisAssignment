import { Field, ObjectType } from "@nestjs/graphql";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@ObjectType()
@Schema()
export class Departments {
    @Field()
    @Prop({required: true})
    id: string;

    @Field()
    @Prop({required: true})
    name: string;
}
export const DepartmentsSchema = SchemaFactory.createForClass(Departments);
