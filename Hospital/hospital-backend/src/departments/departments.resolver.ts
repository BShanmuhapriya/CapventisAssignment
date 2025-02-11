import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Departments } from './departments.schema';
import { DepartmentsService } from './departments.service';

@Resolver(() => Departments)
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) { }

  @Query(() => [Departments])
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
