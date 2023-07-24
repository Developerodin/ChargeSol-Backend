// Assuming you have installed and required mongoose
import mongoose from 'mongoose';

// Create a schema for CompanyDetails
const CompanyDetailsSchema = new mongoose.Schema({
  name: String,
  Price: String,
  OnboardingDate: String,
  // Add any other relevant fields for the company details
});

// Create the Chargers Schema
const ChargersSchema = new mongoose.Schema({
  chargerName: { type: String, required: true },
  chargerStation: String,
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  street: String,
  area: String,
  state: String,
  city: String,
  pincode: String,
  accessType: String,
  openTime: String,
  closeTime: String,
  oem: String,
  ocppId: String,
  fixedCost: Number,
  demandFee: Number,
  ownership: String,
  functional: { type: Boolean, default: true },
  numberOfConnectors: Number,
  companyDetails: [CompanyDetailsSchema], // Array of objects for CompanyDetails
  cpoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CpoUser',
    required: true,
  },
});

// Create the model
export const ChargersModel = mongoose.model('Chargers', ChargersSchema);


