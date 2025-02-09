import { Injectable } from '@nestjs/common';
import { MockDepartmentsDbService } from './mock-departmentsdb.service';

@Injectable()
export class DepartmentsService {
    constructor(private readonly mockDepartmentsDbService: MockDepartmentsDbService) {}

    getAllDepartments() {
        return this.mockDepartmentsDbService.getDepartments();
    }

    createDepartments(name: string) {
        return this.mockDepartmentsDbService.addDepartments({name});
    }
}
