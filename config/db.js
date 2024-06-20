import  Sequelize  from "sequelize";
import dotenv from 'dotenv'
dotenv.config({path: '.env'})//aqui el archivo esta en la raiz del proyecto


const db = new Sequelize(process.env.BD_NAME ,process.env.BD_USER , process.env.BD_PASS ??'', {
    host: process.env.BD_HOST, //en un proyecto a produccion la base datos estará es un hosting separado
    port: 3306,//puerto por defecto de mysql
    dialect: 'mysql',/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    define: {
      timestamps: true
    },
    pool: {
      max: 5,//maximo de 5 conexiones por persona
      min: 0,//desconecta para liberar recursos de la bd
      acquire: 30000,//30 segundos para establecer conexion antes de marcar err
      idle: 10000// 10 segundos donde no hay inactividad para finalizar conexion
      },
    operatorAliases: false  
  });

export default db;