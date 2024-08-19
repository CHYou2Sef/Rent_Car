import express from 'express';
import  {Car}  from '../models/CarModel.js';

const router = express.Router();

// Route save a car
router.post('/', async (request, response) => {
    try {
        if(
            !request.body.matricule ||
            !request.body.modele ||
            !request.body.categorie ||
            !request.body.etat
        )
        {
            return response.status(400).send({
            message : 'Send all reuired fields : mat , modele , cat , etat ...'
            });
        }
        const newCar = {
            matricule : request.body.matricule ,
            modele : request.body.modele ,
            categorie : request.body.categorie ,
            etat : request.body.etat ,
        };

        const car = await Car.create(newCar);
        return response.status(201).send(car);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({message: error.message});
    }
})

// Route for Get All Cars from database
router.get('/', async (request, response) => {
    try {
      const cars = await Car.find({});
  
      return response.status(200).json({
        count: cars.length,
        data: cars,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

// Route for Get Car by id
router.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const car = await Car.findById(id);
  
      return response.status(200).json(car);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

// Route for Update a Car
router.put('/:id', async (request, response) => {
    try {
      if (
            !request.body.matricule ||
            !request.body.modele ||
            !request.body.categorie ||
            !request.body.etat
      ) {
        return response.status(400).send({
          message: 'Send all reuired fields : mat , modele , cat , etat ...'
        });
      }
  
      const { id } = request.params;
  
      const result = await Car.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Car not found' });
      }
  
      return response.status(200).send({ message: 'Car updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
// Route for Delete a car
router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await Car.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Car not found' });
      }
  
      return response.status(200).send({ message: 'Car deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

export default router ;