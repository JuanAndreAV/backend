import nodemailer from 'nodemailer'
import dotenv from  'dotenv'
dotenv.config({path: '.env'})

const emailRegistro = async (datos) =>{
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,//en producción hay otros puertos entonces luego se deben cambiar
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      const {email, nombre, token} = datos

      //enviar email
      await transport.sendMail({
        from: 'juanandres1029@gmail.com',
        to: email,
        sugject: 'Confirma tu cuenta en Raíces',
        text: 'Confirma tu cuenta en Raíces mercado saludable',
        html: `
            <p>Hola ${nombre}, comprueba tu cuenta en Raíces.com</p>
            <p> Confirma tu cuenta en el siguiente enlace:
            <a href="">Confirma tu cuenta</a></p>
        `
      })
}

export {
    emailRegistro
}