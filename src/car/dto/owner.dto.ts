/**
 * A data transfer object define how data will be sent on over the network.
 */

import {
  IsNotEmpty,
  IsISO8601,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateOwnerDto {
  id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;
  
  @IsNotEmpty()
  @IsISO8601()
  purchaseDate: string;
}
