/**
 * A data transfer object define how data will be sent on over the network.
 */

import { IsNotEmpty, IsPhoneNumber, MaxLength } from 'class-validator';

export class CreateManufacturerDto {
  id: string;

  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber('US')
  phone: string;

  @IsNotEmpty()
  siret: number;
}
