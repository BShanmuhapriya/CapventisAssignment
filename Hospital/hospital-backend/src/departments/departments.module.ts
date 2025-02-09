import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsResolver } from './departments.resolver';
import { MockDepartmentsDbService } from './mock-departmentsdb.service';

@Module({
  providers: [DepartmentsService, DepartmentsResolver, MockDepartmentsDbService]
})
export class DepartmentsModule {}
