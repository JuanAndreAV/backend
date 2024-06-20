import { check, validationResult } from 'express-validator';
import User from '../models/User.js';
import { generarId } from '../helpers/tokens.js';
import { emailRegistro } from '../helpers/email.js';

const formularioLogin = (req, res) =>{
    res.render('auth/login',{
        pagina: "Iniciar sesión"
    })
};

const formularioRegistro = (req, res) =>{
    res.render('auth/registro',{
        pagina: 'Crear cuenta'
    })
};
//crear usuario
const registrar = async (req, res)=>{
    //validacion
    await check('nombre').notEmpty().withMessage('ERROR: Debes crear nombre de usuario').run(req);
    await check('email').isEmail().withMessage('no es un Email correcto').run(req);
    await check('password').isLength({min: 6}).withMessage('El password debe tener al menos 6 caractéres').run(req);
    //await check('repetir_password').equals('password').withMessage('las contraseñas no coinciden').run(req);

    let resultado = validationResult(req);
    //return res.json(resultado.array())
    if(!resultado.isEmpty()){
        //errores
        return  res.render('auth/registro',{//el return no ejecuta las demas lineas abajo
        pagina: "Crear cuenta",
        errores: resultado.array(),
        usuario: {
            nombre: req.body.nombre,
            email: req.body.email
        }
        })
    };

    /*const user = await User.create(req.body)
    res.json(user)*/

    // extraer los datos
    const {nombre, email, password} = req.body

    //verificar si usuario existe
    const userExist = await User.findOne( { where : {email}});
    if(userExist){
         return  res.render('auth/registro',{//el return no ejecuta las demas lineas abajo
        pagina: "Crear cuenta",
        errores: [{msg: 'El usuario ya está registrado'}],
        usuario: {
            nombre: req.body.nombre,
            email: req.body.email
        }
        })
    }
    //almacenar el usuario
    const usuario = await User.create({
        nombre,
        email,
        password,
        token: generarId()
    });
    //envia email de confirmacion
    emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
    })

    res.render('template/mensaje', {
        pagina: 'Usuario creado correctamente',
        mensaje: "Hemos enviado un Email para confirmar cuenta"
    })
};




const recuperarPassword = (req, res) =>{
    res.render('auth/recuperarPassword',{
        pagina: 'Recuperar contraseña'
    })
};
//export default formularioLogin este tipo de export solo uno por archivo

export {
    formularioLogin,
    formularioRegistro,
    registrar,
    recuperarPassword  // aqui puedo agragar multiples funciones a exportar
    
}