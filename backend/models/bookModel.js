import mongoose from "mongoose";

//I am creating my model here
const BookModel = mongoose.Schema(

    {

        title:{
            type: String,
            required: true,
        },
        author:{
            type: String,
            required:true,
        },
        publishYear:{
            type: Number,
            required: true,
        },


    },

    {
        timestamps: true,    //I am creating one more object for the timestamps
    }


);

export const Book = mongoose.model('Novel', BookModel);