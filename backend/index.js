import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookmodel.js';

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome to Mern Stack'); 
});

app.post('/books', async (request, response) => {
    try {
        const { title, author, publishYear } = request.body;
        
        if (!title || !author || !publishYear) {
            return response.status(400).send({
                message: 'Please fill all the fields',
            });
        }

        const newBook = {
            title,
            author,
            publishYear,
        };

        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        }
        );
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

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