import { Injectable } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { Services } from "./services.schema";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MockServicesDbService {
    private services: any[] = [];

    constructor() {
        this.loadServicesFromJson();
    }

    private loadServicesFromJson() {
        try {
            const filePath = path.join(__dirname, '..', 'mockdatabase', 'services.json');
            const fileData = fs.readFileSync(filePath, 'utf-8');
            this.services = JSON.parse(fileData) as Services[];
            console.log('Services loaded from JSON file:', this.services);
        } catch (error) {
            console.error('Error loading services from JSON file:', error.message);
        }
    }

    getServices() {
        return this.services;
    }

    addServices(services: Partial<Services>) {
        const newService = {
            id: uuid(),
            name: services.name || "",
            imageUrl: services.imageUrl || "", // Add support for imageUrl
        };
        this.services.push(newService);
        return newService; // Return newly created service
    }
}
