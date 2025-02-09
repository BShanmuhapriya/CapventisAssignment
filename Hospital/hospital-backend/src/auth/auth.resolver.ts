import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthResponse } from "./auth.schema";

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Query(() => String)
    hello(): string {
        return "GraphQL is working!";
    }

    @Mutation(() => AuthResponse)
    async login(
        @Args('email') email: string,
        @Args('password') password: string,
    ): Promise<AuthResponse> {
        return this.authService.login(email, password);
    }
}
