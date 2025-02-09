import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    async login(email: string, password: string) {
        const defaultUser = {
            id: "default-user",
            firstName: "Demo",
            lastName: "User",
            email: "demo@example.com",
            password: "password123", // Default password
            contact: 1234567890,
            gender: "Other",
            dob: new Date(),
        };

        if (email === defaultUser.email && password === defaultUser.password) {
            const token = this.jwtService.sign({ userId: defaultUser.id, email: defaultUser.email });

            console.log("✅ Default user logged in successfully!");

            return {
                token,
                userId: defaultUser.id,
                user: defaultUser // ✅ Include user details in response
            };
        }

        throw new UnauthorizedException("Invalid email or password");
    }
}
