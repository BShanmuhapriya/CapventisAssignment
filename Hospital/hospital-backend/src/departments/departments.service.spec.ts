import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsService } from './departments.service';

describe('ServiceService', () => {
  let services: DepartmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartmentsService],
    }).compile();

    services = module.get<DepartmentsService>(DepartmentsService);
  });

  it('should be defined', () => {
    expect(services).toBeDefined();
  });
});
