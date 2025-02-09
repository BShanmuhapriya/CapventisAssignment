import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesResolver } from './services.resolver';
import { MockServicesDbService } from './mock-servicesdb.service';

@Module({
  providers: [ServicesService, ServicesResolver, MockServicesDbService]
})
export class ServicesModule {}
