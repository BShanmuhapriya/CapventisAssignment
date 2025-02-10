import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Doctor } from './doctor.schema';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MockDatabaseService {
  private doctors: any[] = []; 

  constructor() {
    this.loadDoctorsFromJson();
  }

  private loadDoctorsFromJson() {
    try {
      // Dynamically resolve file path
      const filePath = path.join(__dirname, '..', 'mockdatabase', 'mock_database.json');
      
      // Read the JSON file
      const fileData = fs.readFileSync(filePath, 'utf-8');
      this.doctors = JSON.parse(fileData) as Doctor[];
    } catch (error) {
      console.error('Error loading doctors from JSON file:', error.message);
    }
  }

  getDoctors() {
    return this.doctors;
  }

  addDoctor(doctor: Partial<Doctor>) {
    const newDoctor = {
      id: uuid(),
      availableSlots: [],
      ...doctor,
    };
    this.doctors.push(newDoctor);
  }
}
