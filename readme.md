PROYECTO API DE PELICULAS
 1. Hemos creado un server, el cual conectamos a MongoDB(CARPETA UTILS/DB/connect.js).
 2. En el siguiente paso lo que hemos hecho es introducir las peliculas mediante una semilla, a traves de un json poblando la DB(UTILS/SEEDS/movies.seed.js)
 3. Hemos creado 3 modelos, los cuales conectamos con mongoose para que se guarden en nuestra DB. Un modelos para usuarios, otro para peliculas y un ultimo para cines, el cual esta relacionado con las peliculas, al igual que los usuarios con las mismas.
 4. Creamos rutas, para los endpoints que queramos, y en este caso nos encontramos 3 rutas, una para peliculas, dentro de ella establecemos una estrategia de autenticacion para acceder a cietos endpoints, asi como creamos un endpoint de creacion de peliculas en el cual se pueden subir imagenes. Otro para los cines, en el cual establecemos en algun endpoint autenticacion, y la subida de archivos a cloudinary, con un endpoint en el cual podemos relacionar las peliculas con los cines, es decir, meter peliculas a un cine. Otra para los usuarios, en la cual establecemos el registro, login y logout de los mismmos,pudiendo diferenciar entre admin y un usuario basico, gracias a esto podemos estableces esa autenticacion, con los dos middlewares mencionados antes, para asi, en aquellas rutas que sea get solo necesitaran ser un basic user registrado y para el resto deberan ser admin. También tenemos las posibilidad de ejercer una relacion entre los ususarios y las peliculas, añadiendo las mismas como favoritas.
 5. Se ha establecido un controlador de errores, en la carptrea de UTILS/ERRORS/create-errors.js
 6. Por ultimo, hemos creado una archivo .env para ocualtar las keys y asi no se vean ciertos valores al subir a nuestero repo. 




