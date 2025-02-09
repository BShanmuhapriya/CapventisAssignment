/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor.schema';

@Resolver(() => Doctor)
export class DoctorResolver {
  constructor(private readonly doctorService: DoctorService) {}

  @Query(() => [Doctor])
  async getAllDoctors() {
    return this.doctorService.getAllDoctors();
  }

  @Mutation(() => Doctor)
  async createDoctor(
    @Args('name') name: string,
    @Args('specialization') specialization: string,
    @Args('fees') fees: number,
  ) {
    return this.doctorService.createDoctor(name, specialization, fees);
  }
}
