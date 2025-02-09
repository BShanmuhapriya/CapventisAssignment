/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { Injectable } from '@nestjs/common';
import { MockDatabaseService } from './mock-doctordb.service';

@Injectable()
export class DoctorService {
  constructor(private readonly mockDatabaseService: MockDatabaseService) {}

  // Fetch all doctors
  getAllDoctors() {
    return this.mockDatabaseService.getDoctors();
  }

  // Add a new doctor
  createDoctor(name: string, specialization: string, fees: number) {
    return this.mockDatabaseService.addDoctor({ name, specialization, fees });
  }
}
