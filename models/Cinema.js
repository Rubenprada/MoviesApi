'use strict';

//requerimos mongoose
const mongoose = require('mongoose');


//schema para los cines
const cinemaSchema = new mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    //relacionamos con la coleccion movies
    movies: [{type: mongoose.Types.ObjectId, ref:'Movies'}],
    picture: String
}, {
    timestamps: true
});


//Creamos la coleccion, recibe 2 args
//    1.Nombre de la coleccion
//    2.Esquema que sigue que creamos arriba
const Cinema = mongoose.model('Cinema', cinemaSchema);

//exportamos
module.exports = Cinema;