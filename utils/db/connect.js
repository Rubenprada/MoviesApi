'use strict'



//requerimos mongoose
const mongoose = require('mongoose');

//aqui conectamos con mongoAtlas
const DB_URL = process.env.DB_URL;


//hacemos una funcion para conectar el mongoose por argumentos recibe 
//  1.La URL de la db
//  2.Opciones de configuracion
const connect = () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    });
};



//exportamos el modulo
module.exports = connect;