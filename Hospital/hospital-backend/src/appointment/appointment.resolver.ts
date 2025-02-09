import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Appointment } from "./appointment.schema";
import { AppointmentService } from "./appointment.service";

@Resolver(() => Appointment)
export class AppointmentResolver {
    constructor(private readonly appointmentService: AppointmentService) {}

    @Query(() => [Appointment])
    async getAllAppointments() {
        return this.appointmentService.getAllAppointments();
    }

    @Mutation(() => Appointment)
    async createAppointment(
        @Args("firstName") firstName: string,
        @Args("lastName") lastName: string,
        @Args("email") email: string,
        @Args("gender") gender: string,
        @Args("bloodgroup") bloodgroup: string,
        @Args("reason") reason: string
    ) {
        return this.appointmentService.createAppointment(firstName, lastName, email, gender, bloodgroup, reason);
    }
    
}
