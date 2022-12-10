// 'use strict';

// //requerimos mongoose
// const mongoose = require('mongoose');

// //creamos el esquema
// const adminSchema = new mongoose.Schema({
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         // marcamos formato del email
//         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'El email introducido no tiene un formato válido']
//     },
//     password: {type: String, required: true}
// }, {
//     timestamps: true
// });

// //Creamos la coleccion, recibe 2 args
// //    1.Nombre de la coleccion
// //    2.Esquema que sigue que creamos arriba
// const Admin = mongoose.model('Admin', adminSchema);

// //exportamos
// module.exports = Admin;