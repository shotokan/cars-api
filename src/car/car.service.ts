import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Car } from './interfaces/car.interfaces';
import { CreateCarDto } from './dto/create-car-dto';
import { CreateManufacturerDto } from './dto/manufacturer.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  carEntityToDto,
  manufacturerEntityToDto,
} from './helpers/mapper.helper';
import { Validator } from 'class-validator';
import { ProcessHelper } from './helpers/car-process.herlper';

@Injectable()
export class CarsService {
  validator: Validator;

  constructor(@InjectModel('Car') private readonly carModel: Model<Car>) {
    this.validator = new Validator();
  }

  async create(carDto: CreateCarDto): Promise<CreateCarDto> {
    const newCustomer = await this.carModel(carDto);
    await newCustomer.save();
    return carEntityToDto(newCustomer);
  }

  async getByID(carID: string): Promise<CreateCarDto> {
    const car: Car = await this.carModel.findById(carID).exec();
    return carEntityToDto(car);
  }

  async getAll(): Promise<CreateCarDto[]> {
    const cars = await this.carModel.find().exec();
    const manufacturerDto: Array<CreateCarDto> = [];
    cars.forEach((element: Car) => {
      manufacturerDto.push(carEntityToDto(element));
    });
    return manufacturerDto;
  }

  async update(carID: string, carDto: CreateCarDto): Promise<CreateCarDto> {
    const carUpdated = await this.carModel.findByIdAndUpdate(carID, carDto, {
      new: true,
    });
    if (!carUpdated) {
      throw new NotFoundException('Car does not exist!');
    }
    carDto.id = carID;
    return carDto;
  }

  async delete(carID: string) {
    const ownerDeleted = await this.carModel.findByIdAndRemove(carID);
    if (!ownerDeleted) {
      throw new NotFoundException('car does not exist!');
    }
    return ownerDeleted;
  }

  async getManufacturerByID(carID: string): Promise<CreateManufacturerDto> {
    const car: Car = await this.carModel.findById(carID).exec();
    if (!car) {
      throw new NotFoundException('car does not exist!');
    }
    return manufacturerEntityToDto(car.manufacturer);
  }

  async launchProcess() {
    const processHelper = new ProcessHelper();

    // Remove owners who bought their cars before the last 18 months
    this.carModel
      .updateMany(
        {},
        {
          $pull: {
            owners: {
              purchaseDate: {
                $lt: processHelper.getRangeDateLastMonths().toISOString(),
              },
            },
          },
        },
      )
      .exec();

    const rangeDates = processHelper.getRangeDates();

    // Apply a discount to all cars having a date of first registration between 12 and 18 months
    this.carModel
      .aggregate([
        {
          $match: {
            firstRegistrationDate: {
              $gte: new Date(rangeDates.fromDate.toISOString()),
              $lte: new Date(rangeDates.toDate.toISOString()),
            },
          },
        },
        {
          $addFields: {
            price: {
              $subtract: [
                '$price',
                { $multiply: ['$price', processHelper.getDiscountPercent()] },
              ],
            },
          },
        },
        {
          // mongoose names the collection in lowercase and plural
          $out: 'cars',
        },
      ])
      .exec();
  }
}
