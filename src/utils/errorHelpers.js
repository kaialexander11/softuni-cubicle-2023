//const mongoose = require('mongoose');

const { MongooseError, Error } = require("mongoose");

exports.extractErrorMessages = (error) => {

    if (error instanceof MongooseError) {
        return Object.values(error.errors).map(x => x.message);
    } else if (error instanceof Error) {
        return [error.message];
    }


    //console.log(error instanceof MongooseError);
    //console.log(typeof error);


    // switch (typeof error) {
    //     case 'ValidationError':
    //         return Object.values(err.errors).map(x => x.message);
    //     default:
    //         return [error.message];
    // }

        
}