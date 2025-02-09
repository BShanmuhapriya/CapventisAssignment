import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Departments } from './departments.schema';
import { DepartmentsService } from './departments.service';

@Resolver(() => Departments)
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) { }

  // @Query(() => [Service]) // Must return an array of `Service` objects
  // async getAllServices() {
  //   return this.serviceService.getAllServices(); // Ensure this method exists
  // }

  @Query(() => [Departments]) // Ensure it returns an array of Service objects
  getAllDepartments() {
    return this.departmentsService.getAllDepartments();
  }
  @Mutation(() => Departments)
  async createDepartments(
    @Args('name') name: string,
  ) {
    return this.departmentsService.createDepartments(name);
  }
}
