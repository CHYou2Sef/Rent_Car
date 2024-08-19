import express from 'express';
import { User } from '../models/UserModel.js';

const router = express.Router();

// Route to create a new user
router.post('/', async (request, response) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            address,
            role,
        } = request.body;

        // Check for required fields
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !phoneNumber ||
            !address ||
            !role ||
            !address.street ||
            !address.city ||
            !address.state ||
            !address.postalCode ||
            !address.country
        ) {
            return response.status(400).send({
                message: 'Please provide all required fields: firstName, lastName, email, password, phoneNumber, address (with street, city, state, postalCode, country), and role.'
            });
        }

        // Create a new user object
        const newUser = {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            address,
            role,
            isActive: true // Default value
        };

        // Save the new user to the database
        const user = await User.create(newUser);
        return response.status(201).send(user);
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: error.message });
    }
});



// Route to get all users
router.get('/', async (request, response) => {
    try {
        const users = await User.find({});

        return response.status(200).json({
            count: users.length,
            data: users,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get a user by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const user = await User.findById(id);

        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to update a user
router.put('/:id', async (request, response) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            role,
        } = request.body;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !phoneNumber ||
            !address ||
            !role
        ) {
            return response.status(400).send({
                message: 'Please provide all required fields: firstName, lastName, email, phone, address, role.'
            });
        }

        const { id } = request.params;

        const result = await User.findByIdAndUpdate(id, request.body, { new: true });

        if (!result) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to delete a user
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await User.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'User not found' });
        }

        return response.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
