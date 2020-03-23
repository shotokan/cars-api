/**
 * This interface is used for type-checking and to determine the type of values that will be received by the application.
 */

import { Document } from 'mongoose';
import { Manufacturer } from './manufacturer.interface';
import { Owner } from './owner.interface';

export interface Car extends Document {
  readonly _id: string;
  readonly manufacturer: Manufacturer;
  readonly firstRegistrationDate: Date;
  readonly price: number;
  readonly owners: Array<Owner>;
}
