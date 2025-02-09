import * as fs from "fs";
import * as path from "path";
import * as bcrypt from "bcryptjs";
import { User } from "./user.schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MockUserDbService {
    private users: User[] = [];
    private readonly filePath = path.join(__dirname, "..", "mockdatabase", "users.json");

    constructor() {
        this.loadUsersFromJson();
    }

    private loadUsersFromJson() {
        try {
            console.log("📁 Checking users.json path:", this.filePath);

            if (!fs.existsSync(this.filePath)) {
                console.log("⚠️ users.json not found! Creating with default user...");

                const defaultUsers: User[] = [
                    {
                        id: "default-user",
                        firstName: "Demo",
                        lastName: "User",
                        email: "demo@example.com",
                        contact: 1234567890,
                        gender: "Other",
                        dob: new Date(), // ✅ Fix type mismatch
                        password: bcrypt.hashSync("password123", 10),
                    }
                ];

                this.users = defaultUsers;
                this.saveUsersToJson(); // ✅ Ensure persistence
            } else {
                const fileData = fs.readFileSync(this.filePath, "utf-8");
                this.users = JSON.parse(fileData).map(user => ({
                    ...user,
                    dob: new Date(user.dob) // ✅ Ensure `dob` is a Date object
                }));
                console.log("✅ Loaded Users from JSON:", this.users);
            }
        } catch (error) {
            console.error("❌ Error loading users:", error.message);
        }
    }

    private saveUsersToJson() {
        try {
            console.log("📝 Writing users to users.json...");
            fs.writeFileSync(this.filePath, JSON.stringify(this.users, null, 2), "utf-8");
            console.log("✅ Users saved successfully in users.json!");
        } catch (error) {
            console.error("❌ Error writing to users.json:", error);
        }
    }

    findUserByEmail(email: string): User | undefined {
        return this.users.find(user => user.email === email);
    }
}
