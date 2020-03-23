import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './car.controller';
import { MongoDbServer } from '../db-handler';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './schemas/car.schema';
import { CarsService } from './car.service';

describe('Cars Controller', () => {
  let controller: CarsController;

  beforeEach(async () => {
    await new MongoDbServer().init();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://127.0.0.1:62917/ultra-io?', { useNewUrlParser: true }),
        MongooseModule.forFeature([
          { name: 'Car', schema: CarSchema },
        ]),
      ],
      controllers: [CarsController],
      providers: [CarsService],
    }).compile();

    controller = module.get<CarsController>(CarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
