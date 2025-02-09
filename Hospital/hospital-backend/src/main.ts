require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Allow cookies if needed 
  });

  await app.listen(3000);
}
bootstrap();
