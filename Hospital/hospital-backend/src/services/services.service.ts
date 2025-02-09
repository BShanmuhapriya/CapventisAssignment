import { Injectable } from '@nestjs/common';
import { MockServicesDbService } from './mock-servicesdb.service';

@Injectable()
export class ServicesService {
    constructor(private readonly mockServicesDbService: MockServicesDbService) {}

    getAllServices() {
        return this.mockServicesDbService.getServices();
    }

    createServices(name: string, imageUrl?: string) {
        return this.mockServicesDbService.addServices({ name, imageUrl });
    }
}
