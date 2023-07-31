import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customers', // This refers to the model name of the User
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['resolved', 'unresolved'],
      default: 'unresolved',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    cpoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CpoUsers',
        required: true,
      }
  });
  
 export  const Complaint = mongoose.model('Complaint', complaintSchema);