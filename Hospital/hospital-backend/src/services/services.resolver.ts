import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Services } from './services.schema';
import { ServicesService } from './services.service';

@Resolver(() => Services)
export class ServicesResolver {
  constructor(private readonly servicesService: ServicesService) {}

  @Query(() => [Services])
  getAllServices() {
    return this.servicesService.getAllServices();
  }

  @Mutation(() => Services)
  async createServices(
    @Args('name') name: string,
    @Args('imageUrl', { nullable: true }) imageUrl?: string // Accept image URL
  ) {
    return this.servicesService.createServices(name, imageUrl);
  }
}
