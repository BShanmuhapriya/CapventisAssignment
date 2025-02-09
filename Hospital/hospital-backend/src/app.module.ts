import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ConfigModule } from '@nestjs/config'; // ✅ Import ConfigModule
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { DepartmentsModule } from './departments/departments.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ServicesModule } from './services/services.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ✅ Ensures .env is loaded globally
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const mongod = await MongoMemoryServer.create();
        return { uri: mongod.getUri() };
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    AuthModule,
    DepartmentsModule,
    FeedbackModule,
    DoctorModule,
    ServicesModule,
    AppointmentModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // ✅ Correctly load secret
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    }),
  ],
})
export class AppModule {
  constructor() {
    console.log("JWT_SECRET from process.env:", process.env.JWT_SECRET); // Debugging!
  }
}
