import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.schema'; 

@ObjectType()
export class AuthResponse {
  @Field()
  token: string;
  
  @Field()
  userId: string;

  @Field(() => User, { nullable: true }) 
  user?: User;
}
