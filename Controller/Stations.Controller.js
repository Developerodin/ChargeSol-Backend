import { ChargingStationModel } from "../Models/Stations.Model.js";


export const getAllStations = async (req, res) => {
    try {
      const stations = await ChargingStationModel.find();
      res.status(200).json(stations);
    } catch (err) {
      res.status(500).json({ error: 'Unable to fetch charging stations' });
    }
  };
  
  // Get stations by cpoId
  export const getStationByCpoId = async (req, res) => {
    const { cpoId } = req.params;
    try {
      const stations = await ChargingStationModel.find({ cpoId });
      if (stations.length === 0) {
        res.status(404).json({ message: 'No charging stations found for the given cpoId' });
      } else {
        res.status(200).json(stations);
      }
    } catch (err) {
      res.status(500).json({ error: 'Unable to fetch charging stations by cpoId' });
    }
  };
  
  // Add a new station
  export const addStation = async (req, res) => {
    try {
      const newStation = await ChargingStationModel.create(req.body);
      res.status(201).json(newStation);
    } catch (err) {
      res.status(500).json({ error: 'Unable to add the charging station' });
    }
  };
  
  // Update a station by its ID
  export const updateStation = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedStation = await ChargingStationModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedStation) {
        res.status(404).json({ message: 'Charging station not found' });
      } else {
        res.status(200).json(updatedStation);
      }
    } catch (err) {
      res.status(500).json({ error: 'Unable to update the charging station' });
    }
  };
  
  // Delete a station by its ID
  export const deleteStation = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedStation = await ChargingStationModel.findByIdAndRemove(id);
      if (!deletedStation) {
        res.status(404).json({ message: 'Charging station not found' });
      } else {
        res.status(204).end();
      }
    } catch (err) {
      res.status(500).json({ error: 'Unable to delete the charging station' });
    }
  };

 export const getStationById = async (req, res) => {
    const { id } = req.params;
    try {
      const station = await ChargingStationModel.findById(id);
      if (!station) {
        res.status(404).json({ message: 'Charging station not found' });
      } else {
        res.status(200).json(station);
      }
    } catch (err) {
      res.status(500).json({ error: 'Unable to fetch charging station' });
    }
  };