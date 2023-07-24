import express from 'express';
import { addCharger, deleteCharger, getAllChargers, getChargerById, getChargersByCPOId, updateCharger } from '../Controller/Charger.Controller.js';
 // Adjust the path accordingly

const ChargerRouter = express.Router();

// Route for adding a new charger

ChargerRouter.get('/', getAllChargers);
ChargerRouter.get('/:chargerId', getChargerById);
ChargerRouter.get('/chargers/cpo/:cpoId', getChargersByCPOId);
ChargerRouter.post('/addchargers', addCharger);

// Route for deleting a charger by ID
ChargerRouter.delete('/deletechargers/:chargerId', deleteCharger);

// Route for updating a charger by ID
ChargerRouter.patch('/editchargers/:chargerId', updateCharger);

export default ChargerRouter;