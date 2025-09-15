import mongoose, { Schema, Document } from "mongoose";

export interface IInvoice extends Document {
  userEmail: string;
  date: Date;
  gasFuel: number;
  subscription: number;
  distributionFixed: number;
  distributionVariable: number;
  meter22E: number;
  meter22H: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const InvoiceSchema = new Schema<IInvoice>(
  {
    userEmail: { type: String, required: true, index: true },
    date: { type: Date, required: true },
    gasFuel: { type: Number, required: true, min: 0 },
    subscription: { type: Number, required: true, min: 0 },
    distributionFixed: { type: Number, required: true, min: 0 },
    distributionVariable: { type: Number, required: true, min: 0 },
    meter22E: { type: Number, required: true, min: 0 },
    meter22H: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  }
);

export const InvoiceModel =
  mongoose.models.Invoice || mongoose.model<IInvoice>("Invoice", InvoiceSchema);
