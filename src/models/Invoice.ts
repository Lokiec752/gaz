import mongoose, { Schema, Document } from "mongoose";

export interface IInvoice extends Document {
  id: string;
  userEmail: string;
  date: Date;
  gasFuel: number;
  subscription: number;
  fixedDistribution: number;
  variableDistribution: number;
  meterReading22E: number;
  meterReading22H: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const InvoiceSchema = new Schema<IInvoice>(
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
  },
  {
    timestamps: true,
  }
);

// Calculate total before saving
InvoiceSchema.pre("save", function (next) {
  const doc = this as IInvoice;

  // Calculate total
  doc.total =
    doc.gasFuel +
    doc.subscription +
    doc.fixedDistribution +
    doc.variableDistribution +
    doc.meterReading22E +
    doc.meterReading22H;

  next();
});

export const Invoice =
  mongoose.models.Invoice || mongoose.model<IInvoice>("Invoice", InvoiceSchema);
