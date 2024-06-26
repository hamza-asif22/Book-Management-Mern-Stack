import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js'; // Adjust the path as necessary
import cors from 'cors';


const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

//app.use(cors());

app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome to Mern Stack'); 
});

app.use('/books', booksRoute);

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    
    });
})
.catch((error) => {
    console.log(error);
});