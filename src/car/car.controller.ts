import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Delete,
  HttpCode,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car-dto';
import { CarsService } from './car.service';
import { Messages } from './messages/car.messages';
import { ParseObjectIdPipe } from './parseObjectID.pipe'

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Get()
  getAll() {
    //TODO: pagination
    return this.carsService.getAll();
  }

  @Get(':carID')
  async getByID(@Res() res, @Param('carID', ParseObjectIdPipe) carID: string) {
    const car = await this.carsService.getByID(carID);
    if (Object.entries(car).length === 0) {
      return res.status(HttpStatus.NOT_FOUND).json(car);
    }
    return res.status(HttpStatus.OK).json(car);
  }

  @Put(':carID')
  @HttpCode(204)
  update(@Param('carID') carID, @Body() updateCarDto: CreateCarDto) {
    return this.carsService.update(carID, updateCarDto);
  }

  @Delete(':carID')
  @HttpCode(204)
  delete(@Param('carID', ParseObjectIdPipe) carID: string) {
    return this.carsService.delete(carID);
  }

  @Get(':carID/manufacturers')
  async getManufacturer(@Res() res, @Param('carID', ParseObjectIdPipe) carID: string) {
    const car = await this.carsService.getManufacturerByID(carID);
    if (Object.entries(car).length === 0) {
      return res.status(HttpStatus.NOT_FOUND).json(car);
    }
    return res.status(HttpStatus.OK).json(car);
  }

  @Post('trigger-process')
  async triggerProcess(@Res() res) {
    await this.carsService.launchProcess();
    return res.status(HttpStatus.ACCEPTED).json({ message: Messages.CarProcess });
  }
}
