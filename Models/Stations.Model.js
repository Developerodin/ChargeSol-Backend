import mongoose from 'mongoose';


const chargingStationSchema = new mongoose.Schema({
    cpoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CpoUsers',
      required: true,
    },
    StationName: {
      type: String,
      required: true
    },
    Latitude: {
      type: String,
      required: true
    },
    Longitude: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    area: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    landmark: {
      type: String,
      required: true
    },
    Pincode: {
      type: String,
      required: true
    },
    accesstype: {
      type: String,
      required: true
    },
    opentime: {
      type: String,
      required: true
    },
    closetime: {
      type: String,
      required: true
    }
  });
  
 export const ChargingStationModel = mongoose.model('ChargingStation', chargingStationSchema);