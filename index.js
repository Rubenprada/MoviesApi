require('dotenv').config();

//require express
const express = require('express');

//importamos el modulo de movies.routes
const moviesRouter = require('./routes/movies.routes.js')

//importamos el modulo de cines
const cinemaRouter = require('./routes/cinema.routes.js');

//importamos la funcion connect
const connect = require('./utils/db/connect.js');

//requerimos cors para postman
const cors = require('cors');

//llamamos passport
const passport = require('passport');


//requerimos el manejador de errores
const createError = require('./utils/errors/create-errors.js');



//importamos el modulo de users
const userRouter = require('./routes/user.routes.js');

//importamos el modulo admin
// const adminRouter = require('./routes/admin.routes.js');

//llamamos a express-session para guardar sesiones
const session = require('express-session');

//usamos mongoStore para guardar las sesiones
const MongoStore = require('connect-mongo');

const path = require('path');

const cloudinary = require('cloudinary');

const DB_URL = process.env.DB_URL;

//me conecto a la db
connect();


//creo un puerto para el servidor
const PORT = process.env.PORT || 3000;

//creo el servidor
const server = express();

//cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARI_NAME, 
    api_key: process.env.KEY_CLOUDINARY, 
    api_secret:  process.env.SECRET_CLOUDINARY 
});

//iniciamos cors
server.use(cors());

//usamos express.json para parsear las peticiones en formato json
server.use(express.json());

//usamos express.urlencoded para parsear array y objetos
server.use(express.urlencoded({ extended : false }));

//archivos estaticos
server.use(express.static(path.join(__dirname, 'public')));

//ruta passport para users
require('./utils/authentications/passport-users.js');

//ruta para admins
// require('./utils/authentications/passport-admin.js');

//gestión de sesiones
server.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        //milisegundos de caducidad de la cookie
        maxAge: 60000
    }, 
    //almacén donde guardamos las sesiones
    store: MongoStore.create({
        mongoUrl: DB_URL 
    })
}));


//iniciamos passport
server.use(passport.initialize());

//usamos la sesison
server.use(passport.session());

server.get('/', (req, res) => {
    res.join('Bienvenido a mi API')
});

//ruta para usuarios
server.use('/user', userRouter);

//ruta para admin
// server.use('/admin', adminRouter);

//hacemos una ruta para las peliculas, lleva de argumento la ruta
//para las peliculas, y el router de peliculas
server.use('/movies', moviesRouter);

//Y ahora para los cines
server.use('/cinema', cinemaRouter);

//hacemos manejo de error para todas las rutas que no tengamos creadas
server.use('*', (req, res, next) => {
    next(createError('No existe la ruta a la que intentas acceder', 404))
});

server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.mensaje || 'error inesperado')
});

//hacemos un listen para ver donde escucha el servidor y en que puerto
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log(`Url: http//localhost:${PORT}`);
});

//exportamos el server para vercel
module.exports = server;