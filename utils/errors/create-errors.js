'use strict'

//vamos a menejar los errores a traves de una función a la que le pasamos el mensaje que queramos
//y el estatus que le queramos dar
const createError = (mensaje, status) => {
    const error = new Error(mensaje);
    error.status = status;
    return error;
};

//exportamos
module.exports = createError;