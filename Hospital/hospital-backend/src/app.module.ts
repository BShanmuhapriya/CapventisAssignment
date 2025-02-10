import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongoMemoryServer } from 'mongodb-memory-server-core';
import { ConfigModule } from '@nestjs/config'; // ✅ Import ConfigModule
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
    DepartmentsModule,
    FeedbackModule,
    DoctorModule,
    ServicesModule,
    AppointmentModule,
  ],
})
export class AppModule {}
