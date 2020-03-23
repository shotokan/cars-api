import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarsController } from './car.controller';
import { CarsService } from './car.service';
import { CarSchema } from './schemas/car.schema';

import { OwnerSchema } from './schemas/owner.schema';
import { ManufacturerSchema } from './schemas/manufacturer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Car', schema: CarSchema },
      { name: 'Owner', schema: OwnerSchema },
      { name: 'Manufacturer', schema: ManufacturerSchema },
    ]),
  ],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarModule {}
