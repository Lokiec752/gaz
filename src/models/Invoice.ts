import mongoose, { Schema } from "mongoose";

type Charges = {
  house22E: number;
  house22H: number;
};

export type Invoice = {
  id: string; // Mongoose virtual for _id
  userEmail: string;
  date: Date;
  gasFuel: number;
  subscription: number;
  fixedDistribution: number;
  variableDistribution: number;
  meterReading22E: number;
  meterReading22H: number;
  total: number;
  charges: Charges;
  createdAt: Date;
  updatedAt: Date;
};

const InvoiceSchema = new Schema<Invoice>(
  {
    userEmail: { type: String, required: true, index: true },
    date: { type: Date, default: Date.now },
    gasFuel: { type: Number, required: true, min: 0 },
    subscription: { type: Number, required: true, min: 0 },
    fixedDistribution: { type: Number, required: true, min: 0 },
    variableDistribution: { type: Number, required: true, min: 0 },
    meterReading22E: { type: Number, required: true, min: 0 },
    meterReading22H: { type: Number, required: true, min: 0 },
    total: { type: Number, min: 0, default: 0 }, // Not required since it's auto-calculated
    charges: {
      house22E: { type: Number, required: true, min: 0 },
      house22H: { type: Number, required: true, min: 0 },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Include virtuals when converting to JSON
    toObject: { virtuals: true }, // Include virtuals when converting to Object
  }
);

// No pre-save hook needed - calculations are done in the action functions

export const InvoiceModel =
  mongoose.models.Invoice || mongoose.model<Invoice>("Invoice", InvoiceSchema);
