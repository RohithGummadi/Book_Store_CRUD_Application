import express from "express";
const router = express.Router();
import {Book} from "../models/bookModel.js";



//Route for saving a new book

router.post('/', async (request, response)=>{

    try{
        if( !request.body.title || !request.body.publishYear || !request.body.author){

            return response.status(400).send({
                message:"Send all the required fields: title, author, published year"
            });

        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        }
        const book= await Book.create(newBook)

        return response.status(201).send(book);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({Message: error.message})
    }

});

router.get('/', async(request, response) =>{
    try{

        const books =await Book.find({}); // all items in the database
        return response.status(201).json({
            count: books.length,
            data: books
        });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({Message: error.message})
    }
});


router.get('/:id', async(request, response) =>{
    try{

        const {id} = request.params;
        const book = await Book.findById(id);
        return response.status(201).send(book)
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({Message: error.message})
    }
});

//Route for Update a Book
router.put('/:id', async(request,response)=>{

    try{
        if( !request.body.title || !request.body.publishYear || !request.body.author){

            return response.status(400).send({
                message:"Send all the required fields: title, author, published year"
            });

        }

        const {id}=request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }
        return response.status(201).send({ message: 'Book updated succesfully'});


    } catch(error){

        console.log(error.message);
        response.status(500).send({message:error})
    }

});
//Route to delete a book

router.delete('/:id', async(request,response)=>{

    try{

        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result){
            return response.status(404).json({message: 'Book not found'})
        }
        return response.status(201).send({message: "The book is deleted succesfully"});

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message})
    }

});

export default router