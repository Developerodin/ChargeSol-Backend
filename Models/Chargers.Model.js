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
  ChargerName: { type: String, required: true },
  ChargerStation: String,
  Latitude: { type: Number, required: true },
  Longitude: { type: Number, required: true },
  street: String,
  area: String,
  state: String,
  city: String,
  Pincode: String,
  accesstype: String,
  opentime: String,
  closetime: String,
  OEM: String,
  OCPP_ID: String,
  ChargerType: String,
  PowerRating: String,
  Connectors: String,
  fixedCost: Number,
  demandFee: Number,
  ownership: String,
  functional: { type: Boolean, default: true },
  numberOfConnector: Number,
  onboardindDate:String,
  CompanyName: String,
  ChargerPrice: String, // Array of objects for CompanyDetails
  cpoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CpoUsers',
    required: true,
  },
  status :{
    type:Object
  }
});

// Create the model
export const ChargersModel = mongoose.model('Chargers', ChargersSchema);


