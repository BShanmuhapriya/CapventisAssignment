import { Injectable } from '@nestjs/common';
import { MockDatabaseService } from './mock-doctordb.service';

@Injectable()
export class DoctorService {
  constructor(private readonly mockDatabaseService: MockDatabaseService) {}

  getAllDoctors() {
    return this.mockDatabaseService.getDoctors();
  }

  createDoctor(name: string, specialization: string, fees: number) {
    return this.mockDatabaseService.addDoctor({ name, specialization, fees });
  }
}
