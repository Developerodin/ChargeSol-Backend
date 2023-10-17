import express from 'express';
import { addCharger, deleteCharger, getAllChargers, getChargerById, getChargersByCPOId, updateCharger, updateChargerStatus, updateFunctionalStatus } from '../Controller/Charger.Controller.js';
 // Adjust the path accordingly

const ChargerRouter = express.Router();

// Route for adding a new charger

ChargerRouter.get('/', getAllChargers);
ChargerRouter.get('/:chargerId', getChargerById);
ChargerRouter.get('/cpo/:cpoId', getChargersByCPOId);
ChargerRouter.post('/addchargers', addCharger);
ChargerRouter.post('/update-functional', updateFunctionalStatus)
ChargerRouter.post('/update-status', updateChargerStatus)
// Route for deleting a charger by ID
ChargerRouter.delete('/deletechargers/:chargerId', deleteCharger);

// Route for updating a charger by ID
ChargerRouter.patch('/editchargers/:chargerId', updateCharger);

export default ChargerRouter;