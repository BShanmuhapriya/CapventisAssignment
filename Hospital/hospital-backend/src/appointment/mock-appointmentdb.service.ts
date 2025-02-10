import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import { Appointment } from "./appointment.schema";
import { v4 as uuid } from "uuid";

@Injectable()
export class MockDatabaseAppointment {
    private appointments: any[] = [];

    constructor() {
        this.loadAppointmentsFromJson();
    }

    private loadAppointmentsFromJson() {
        try {
            const filePath = path.join(__dirname, "..", "mockdatabase", "appointment.json");
            const fileData = fs.readFileSync(filePath, "utf-8");
            this.appointments = JSON.parse(fileData);
        } catch (error) {
            console.error("Error loading appointment details from JSON file:", error.message);
        }
    }

    getAppointments() {
        return this.appointments;
    }

    addAppointment(appointment: Partial<Appointment>) {
        const newAppointment = {
            id: uuid(),
            firstName: appointment.firstName || "",
            lastName: appointment.lastName || "",
            email: appointment.email || "",
            gender: appointment.gender || "",
            bloodgroup: appointment.bloodgroup || "",
            reason: appointment.reason || "",
        };

        this.appointments.push(newAppointment);
        this.saveAppointmentsToJson();
        return newAppointment;
    }

    private saveAppointmentsToJson() {
        try {
            const filePath = path.join(__dirname, "..", "mockdatabase", "appointment.json");
            fs.writeFileSync(filePath, JSON.stringify(this.appointments, null, 2), "utf-8");
            console.log("Appointment successfully saved!");
        } catch (error) {
            console.error("Error writing appointment data to JSON:", error.message);
        }
    }
}

