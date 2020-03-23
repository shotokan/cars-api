import { MongoDbServer } from './db-handler';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('starting...')
  // initialize mongodb-memory-server values
  await new MongoDbServer().init();
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
