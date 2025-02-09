import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentResolver } from './appointment.resolver';
import { MockDatabaseAppointment } from './mock-appointmentdb.service';

@Module({
  providers: [AppointmentService, AppointmentResolver, MockDatabaseAppointment]
})
export class AppointmentModule {}
