import * as mongoose from 'mongoose';
import { ManufacturerSchema } from './manufacturer.schema';
import { OwnerSchema } from './owner.schema';

export const CarSchema = new mongoose.Schema({
  manufacturer: ManufacturerSchema,
  firstRegistrationDate: Date,
  price: Number,
  owners: [OwnerSchema],
  createdAt: { type: Date, default: Date.now },
});
