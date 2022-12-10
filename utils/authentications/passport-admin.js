// "use strict";

// //llamamos a passport
// const passport = require('passport');

// //llamamos al modelo admin
// const Admin = require("../../models/Admin.js");

// //llamamos la libreria de passport-local
// const LocalStrategy = require('passport-local').Strategy;

// //llamamos a bcrypt para encriptar las pass
// const bcrypt = require('bcrypt');

// //direccion creador de errores
// const createError = require("../errors/create-errors.js");

// //generamos la estrategia de autenticación
// passport.use(
//   //nombre estrategia
//   'registerAdmin',
//   //estrategia
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//       passReqToCallback: true
//     },
//     //callback para cada vez que se registra un admin
//     async (req, email, password, done) => {
//       try {
//         //comprobamos que el admin que se intenta registrar existe, por su email
//         //que lo pusimos como unico y no puede haber dos iguales
//         const previousUser = await Admin.findOne({ email });
//         if (previousUser) {
//           return done(createError("Este usuario ya existe, inicia sesión"));
//         }
//         //ahora encriptamos la pass
//         const encPassword = await bcrypt.hash(password, 10);
//         //creamos el nuevo admin
//         const newUser = new Admin({
//           email,
//           password: encPassword,
//         });
//         //Guardamos al admin en BD
//         const savedUser = await newUser.save();
//         return done(null, savedUser);
//       } catch (err) {
//         return done(err);
//       }
//     }
//   )
// );

// //creamos estrategia de loggin
// passport.use(
//   'loginAdmin',
//   new LocalStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password',
//       passReqToCallback: true
//     },
//     async (req, email, password, done) => {
//       try {
//         const currentUser = await Admin.findOne({ email });
//         //con la variable de arriba miramos si el usuario existe o no
//         if (!currentUser) {
//           return done(
//             createError("No existe el usuario con ese email, registrate")
//           );
//         }
//         //comparamos si la pass encriptada del usuario es igual a la del admin de DB con compare, devuelve true si son iguales
//         const isValidPassword = await bcrypt.compare(
//           password,
//           currentUser.password
//         );
//         //en caso de que no sean iguales
//         if (!isValidPassword) {
//           return done(createError("la contraseña es incorrecta"));
//         }
//         //vamos a ocualtar la contraseña del usuario cuando se logea
//         currentUser.password = null;
//         return done(null, currentUser);
//       } catch (err) {
//         return done(err);
//       }
//     }
//   )
// );

// //registrar admin en l DB por id
// passport.serializeUser((admin, done) => {
//   return done(null, admin._id);
// });

// //buscamos al admin por su id
// passport.deserializeUser(async (adminId, done) => {
//   try {
//     const existingUser = await Admin.findById(adminId);
//     return done(null, existingUser);
//   } catch (err) {
//     return done(err);
//   }
// });

