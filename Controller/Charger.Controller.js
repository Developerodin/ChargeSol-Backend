import { ChargersModel } from '../Models/Chargers.Model.js';
import  catchAsync  from '../utils/catchAsync.js'; // or any other error handling middleware you prefer
 // Adjust the path accordingly


 // Controller for getting all chargers
export const getAllChargers = catchAsync(async (req, res, next) => {
    const chargers = await ChargersModel.find();
    res.status(200).json({
      status: 'success',
      data: {
        chargers,
      },
    });
  });


// Controller for getting a charger by ID
export const getChargerById = catchAsync(async (req, res, next) => {
    const { chargerId } = req.params;
    const charger = await ChargersModel.findById(chargerId);
    if (!charger) {
      return res.status(404).json({
        status: 'fail',
        message: 'Charger not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: {
        charger,
      },
    });
  });
  


  export const getChargersByCPOId = catchAsync(async (req, res, next) => {
    const { cpoId } = req.params;
  
    // Perform a query to find all chargers with the given CPO ID
    const chargers = await ChargersModel.find({ cpoId })
      .populate('cpoId') // Use populate to fetch the related CpoUser details
      .exec();
  
    if (!chargers || chargers.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Chargers not found for the given CPO ID',
      });
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        chargers,
      },
    });
  });
  
  
// Controller for adding a new charger
export const addCharger = catchAsync(async (req, res, next) => {
  const chargerData = req.body;
  const newCharger = await ChargersModel.create(chargerData);
  res.status(201).json({
    status: 'success',
    data: {
      charger: newCharger,
    },
  });
});

export const updateFunctionalStatus = async (req, res) => {
  const { chargerId, functionalStatus } = req.body; // Assuming the frontend sends the chargerId and functionalStatus in the request body

  try {
    // Find the charger by ID
    const charger = await ChargersModel.findById(chargerId);

    if (!charger) {
      return res.status(404).json({ error: 'Charger not found' });
    }

    // Update the functional status based on the value from the frontend
    charger.functional = functionalStatus;

    // Save the updated charger object
    await charger.save();

    return res.status(200).json({ message: 'Functional status updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// Controller for deleting a charger by ID
export const deleteCharger = catchAsync(async (req, res, next) => {
  const { chargerId } = req.params;
  const deletedCharger = await ChargersModel.findByIdAndDelete(chargerId);
  if (!deletedCharger) {
    return res.status(404).json({
      status: 'fail',
      message: 'Charger not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: null,
  });
});

// Controller for updating a charger by ID
export const updateCharger = catchAsync(async (req, res, next) => {
  const { chargerId } = req.params;
  const chargerData = req.body;
  const updatedCharger = await ChargersModel.findByIdAndUpdate(chargerId, chargerData, {
    new: true, // Return the modified document rather than the original
    runValidators: true, // Run model validation when updating
  });
  if (!updatedCharger) {
    return res.status(404).json({
      status: 'fail',
      message: 'Charger not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      charger: updatedCharger,
    },
  });
});
