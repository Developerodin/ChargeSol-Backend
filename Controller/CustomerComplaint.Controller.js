import { Complaint } from "../Models/Complaint.Model.js";



export const getAllComplaints = async (req, res) => {
    try {
      const complaints = await Complaint.find();
      res.send({
        status :"success",
        complaints:complaints
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

 export const getComplaintsByUserId = async (req, res) => {
    const id = req.params.id; // Assuming you pass the userId as a route parameter
  
    try {
      const complaints = await Complaint.find({ user: id });
      res.send({
        status :"success",
        complaints:complaints
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  export const getComplaintsByCpoId = async (req, res) => {
    const cpoId = req.params.cpoId; // Assuming you pass the cpoId as a route parameter
  
    try {
      const complaints = await Complaint.find({ cpoId: cpoId });
      res.send({
        status :"success",
        complaints:complaints
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

export const createComplaint = async (req, res) => {
    const {userId,company,description,title,cpoId} = req.body; // Assuming you have the user ID available in the request (e.g., from authentication middleware)
  
    const complaint = new Complaint({
      user:userId,
      company:company,
      description:description,
      title:title,
      cpoId:cpoId
    });
  
    try {
      const newComplaint = await complaint.save();
      res.send({
        status :"success",
        newComplaint:newComplaint
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  export const updateComplaintStatus = async (req, res) => {
    try {
      const complaint = await Complaint.findById(req.params.id);
      if (!complaint) {
        return res.status(404).json({ message: 'Complaint not found' });
      }
  
      if (req.body.status) {
        complaint.status = req.body.status;
      }
  
      const updatedComplaint = await complaint.save();
      res.send({
        status :"success",
        updatedComplaint:updatedComplaint
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };