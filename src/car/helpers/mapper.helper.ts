import { CreateCarDto } from '../dto/create-car-dto';
import { CreateOwnerDto } from '../dto/owner.dto';
import { CreateManufacturerDto } from '../dto/manufacturer.dto';
import { Car } from '../interfaces/car.interfaces';
import { Manufacturer } from '../interfaces/manufacturer.interface';
import * as moment from 'moment';

function carEntityToDto(carEntity: Car): CreateCarDto {
  const carDto = new CreateCarDto();
  const manufacturerDto: CreateManufacturerDto = new CreateManufacturerDto();
  const ownersDto = Array<CreateOwnerDto>();
  carDto.owners = ownersDto;
  carDto.manufacturer = manufacturerDto;

  if (!carEntity) {
    return carDto;
  }
  carDto.id = carEntity._id;
  if (carEntity.manufacturer) {
    carDto.manufacturer.id = carEntity.manufacturer._id;
    carDto.manufacturer.name = carEntity.manufacturer.name;
    carDto.manufacturer.phone = carEntity.manufacturer.phone;
    carDto.manufacturer.siret = carEntity.manufacturer.siret;
  }
  const date = moment(carEntity.firstRegistrationDate);
  carDto.firstRegistrationDate = date.toISOString();
  carDto.price = carEntity.price;
  if (Array.isArray(carEntity.owners)) {
    carEntity.owners.forEach(owner => {
      const dto: CreateOwnerDto = new CreateOwnerDto();
      dto.id = owner._id;
      dto.name = owner.name;
      const purchaseDate = moment(owner.purchaseDate);
      dto.purchaseDate = purchaseDate.toISOString();
      carDto.owners.push(dto);
    });
  }
  return carDto;
}

function manufacturerEntityToDto(manufacturerEntity: Manufacturer) {
  const manufacturerDto: CreateManufacturerDto = new CreateManufacturerDto();
  if (manufacturerEntity) {
    manufacturerDto.id = manufacturerEntity._id;
    manufacturerDto.name = manufacturerEntity.name;
    manufacturerDto.phone = manufacturerEntity.phone;
    manufacturerDto.siret = manufacturerEntity.siret;
  }
  return manufacturerDto;
}
export { carEntityToDto, manufacturerEntityToDto };
