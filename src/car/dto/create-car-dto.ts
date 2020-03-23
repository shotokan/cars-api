/**
 * A data transfer object define how data will be sent on over the network.
 */

import {
  IsNotEmpty,
  IsNumber,
  IsISO8601,
  IsArray,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateManufacturerDto } from './manufacturer.dto';
import { CreateOwnerDto } from './owner.dto';

export class CreateCarDto {
  id: string;

  @ValidateNested()
  @Type(()=>CreateManufacturerDto)
  manufacturer: CreateManufacturerDto;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsISO8601()
  firstRegistrationDate: string;

  @ValidateNested({ each: true })
  @Type(()=>CreateOwnerDto)
  @IsArray()
  owners: CreateOwnerDto[];
}
