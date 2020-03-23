import * as mongoose from 'mongoose';

export const ManufacturerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  siret: Number,
  createdAt: { type: Date, default: Date.now },
});
