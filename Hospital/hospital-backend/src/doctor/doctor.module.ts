import { Module } from '@nestjs/common';
import { DoctorResolver } from './doctor.resolver';
import { DoctorService } from './doctor.service';
import { MockDatabaseService } from './mock-doctordb.service';

@Module({
  providers: [DoctorResolver, DoctorService, MockDatabaseService],
})
export class DoctorModule {}
