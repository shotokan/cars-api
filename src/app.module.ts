
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { CarModule } from './car/car.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:62917/ultra-io?', { useNewUrlParser: true }), CarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
