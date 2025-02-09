import { Injectable } from "@nestjs/common";
import {v4 as uuid} from "uuid";
import { Departments } from "./departments.schema";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MockDepartmentsDbService {
    private departments: any[] = [];

    constructor() {
        this.loadDepartmentsFromJson();
    }

    private loadDepartmentsFromJson() {
        try {
          // Dynamically resolve file path
          const filePath = path.join(__dirname, '..', 'mockdatabase', 'departments.json');
          
          // Read the JSON file
          const fileData = fs.readFileSync(filePath, 'utf-8');
          this.departments = JSON.parse(fileData) as Departments[];
    
          console.log('Doctors loaded from JSON file:', this.departments);
        } catch (error) {
          console.error('Error loading doctors from JSON file:', error.message);
        }
      }
    getDepartments() {
        return this.departments;
    }

    addDepartments(departments: Partial<Departments>) {
        const newDepartment = {
            id: uuid(),
            name: "",
            ...departments,
        };
        this.departments.push(newDepartment);
    }
}