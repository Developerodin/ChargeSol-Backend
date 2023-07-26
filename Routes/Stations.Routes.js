import express from 'express';
import { addStation, deleteStation, getAllStations, getStationByCpoId, getStationById, updateStation } from '../Controller/Stations.Controller.js';

 // Adjust the path accordingly

const StaionRouter = express.Router();

StaionRouter.get('/stations', getAllStations);

// GET charging stations by cpoId
StaionRouter.get('/stationsbyCpoId/:cpoId', getStationByCpoId);
StaionRouter.get('/stationsbyId/:id', getStationById);

// POST add a new charging station
StaionRouter.post('/addstation', addStation);

// PUT update a charging station by ID
StaionRouter.put('/editstations/:id', updateStation);

// DELETE a charging station by ID
StaionRouter.delete('/deletestations/:id', deleteStation);

export default StaionRouter;