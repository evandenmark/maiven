import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS and allow requests from http://localhost:5173
  app.enableCors({
    origin: 'http://localhost:5173', // Replace this with your frontend URL
    methods: 'GET,POST,DELETE,PUT,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
  });

  await app.listen(3000);
}
bootstrap();