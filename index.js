//const express = require("express");
import express from "express";
import userRoutes from './routes/userRoutes.js';//importo las rutas
import db from './config/db.js';

//crear app
const app = express()
const port = 4000

//habilitar lectura de datos form
app.use(express.urlencoded({extended: true}))



//conexion a la db
try {
    await db.authenticate();
    db.sync()
    console.log("conexion correcta a la BD")
} catch (err) {
    console.log('no fue posible la conexion ',err)
}


//Habilitar PUG
app.set('view engine', 'pug');
app.set('views', './views');

//carpeta pública
app.use( express.static('public'))



//routing se ha agregado a la carpeta routes
app.use('/', userRoutes)//debo utilizar el método use; no get, ya que se limita a ruta exacta


//servidor
app.listen(port, (err)=>{
    if(err)console.log("algo salió mal");
    console.log(`server listening on port ${port}`)
})





