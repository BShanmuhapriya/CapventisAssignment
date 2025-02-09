import { Injectable } from '@nestjs/common';
import { MockDatabaseAppointment } from './mock-appointmentdb.service';
@Injectable()
export class AppointmentService {
    constructor(private readonly mockDatabaseAppointment: MockDatabaseAppointment) {}

    getAllAppointments() {
        return this.mockDatabaseAppointment.getAppointments();
    }

    createAppointment(firstName: string, lastName: string, email: string, gender: string, bloodgroup: string, reason: string) {
        return this.mockDatabaseAppointment.addAppointment({ firstName, lastName, email, gender, bloodgroup, reason });
    }
}
