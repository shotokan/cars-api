import * as mongoose from 'mongoose';

export const OwnerSchema = new mongoose.Schema({
  name: String,
  purchaseDate: Date,
  createdAt: { type: Date, default: Date.now },
});
