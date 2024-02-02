import express from "express";
import {PORT, MongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();


app.use(express.json());  //Middleware for parsing the request body

app.use(cors()); // allows all the requests

// app.use(cors(  // Here we can define an object with specifications on what requests the server should accept
//     {
//      origin:"http://localhost:3000",
//      methods:[ ],
//      allowedHeaders:[],
//     })
// );

// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get("/", (request, response)=> {
    console.log(request)
    return response.status(234).send("Welcome to my portal")

})

app.use('/books', booksRoute); //use this middleware ( This Express Router in this booksRoute will take care of routes with /books)


mongoose
    .connect(MongoDBURL)
    .then(()=>{
        console.log("App is connected to the Mongo DB")
        app.listen(PORT, ()=> {  //This is how we know the local server address on the ports
            console.log(`App is listening to port: ${PORT}`)
        
        });

    })
    .catch((error)=>{
        console.log(error)
    });


