import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import {PORT, mongoDBURL} from './config.js';
import CarRoutes from './routes/CarRoutes.js';
import UserRoutes from './routes/UserRoutes.js';

const app = express() ;


//Middleware for parsing request body
app.use(express.json());

app.use('/Cars', CarRoutes);
app.use('/Users', UserRoutes);

//main root test
app.get('/', (request,response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Car Rental Project :)');
});



// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

// connect to DB
mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("App connect to database");
        app.listen(PORT, () => {
            console.log(`This app is using the port ${PORT}`);
        });

    })
    .catch((error)=>{
        console.log(error);
    })