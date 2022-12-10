'use strict';

//llamamos a mongoose
const mongoose = require('mongoose');
//llamamos a el esquema
const Movies = require('../../models/Movies.js');

//llamamos a fs para leer los archivos
const fs = require('fs');


//aqui conectamos con mongoAtlas
const DB_URL = process.env.DB_URL;

//hacemos una funcion para conectar el mongoose por argumentos recibe 
//  1.La URL de la db
//  2.Opciones de configuracion

mongoose.connect(DB_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(async () => {
    //en este then lo que hacemos es resetear todos los elementos
    const allMovies = await Movies.find();
    //si allMovies tiene longitud(tiene algo)
    if(allMovies.length) {
        //use drop eliminamos todos el contenido
        await Movies.collection.drop();
    }
}).catch(err => {
    //ponemos un catch para coger los errores
    console.log(`Ha habido un error eliminando los datos ${err}`);
})
.then(async () => {
    //con este den una vez eliminado todo añadimos los documentos
    //leemos el json de manera asincrona y lo metemos en data
    const data = fs.readFileSync('./utils/seeds/db/movies.json');
    //parseamos la data
    const parsedData = JSON.parse(data);
    //mapeamos los datos para que de objetos pasean a ser doc que sigan
    //el esquema
    const moviesDocs = parsedData.map((movies) => {
        return new Movies(movies);
    });
    //añadimos todos los doc de moviesDoc
    await Movies.insertMany(moviesDocs);
})
.catch((err) => {
    //cacheamos error añadiendo los elementos
    console.log(`Ha habido un error añadiendo los elementos a la BD ${err}`)
})
    //desconectamos la db
.finally(() => mongoose.disconnect());




