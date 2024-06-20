import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../config/db.js'

const User = db.define('usuarios', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false    //validacion para que no esté vacio este campo
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN
}, {
    hooks: {
        beforeCreate: async function(usuario){
            const salt = await bcrypt.genSalt(10)//por defalut se define 10
            usuario.password = await bcrypt.hash(usuario.password, salt);

        }
    }
})

export default User