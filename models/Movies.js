'use strict';

//llamamos a mongoose
const mongoose = require('mongoose');



//Cremos un schema(plantilla) para las peliculas, recibe 2 args
//   1.El esquema que queremos crear
//   2. Opciones de configuracion
const moviesSchema = new mongoose.Schema(
    {
        title : {type: String, required: true, unique: true},
        director : {type: String, required: true},
        year: {type: Number, required: true},
        genre : {
            type: [String], 
            enum: {
                values: ["Animacion", "Anime", "Accion", "Aventuras", "Belica", "Ciencia Ficcion", "Comedia", "Cortometraje", "Crimen", "Deportiva", "Documental", "Drama", "Familiar", "Fantasia", "Futurista", "Historica", "Musical", "Policiaca", "Religiosa", "Romantica", "Suspense", "Terror", "Western"],
                message: "Ese genero no es valido. "
            }
        },
        picture: String

    },
    {
        timestamps: true
    }
);


//Creamos la coleccion, recibe 2 args
//    1.Nombre de la coleccion
//    2.Esquema que sigue que creamos arriba
const Movies = mongoose.model('Movies', moviesSchema);

//exportamos
module.exports = Movies;