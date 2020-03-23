/**
 * This interface is used for type-checking and to determine the type of values that will be received by the application.
 */

import { Document } from 'mongoose';

export interface Manufacturer extends Document {
  readonly _id: string;
  readonly name: string;
  readonly phone: string;
  readonly siret: number;
  readonly created_at: Date;
}
