import  express  from "express";
import { formularioLogin, formularioRegistro, registrar, recuperarPassword } from "../controllers/usuario.controller.js";


const router = express.Router();

router.get('/login', formularioLogin);

router.get('/registro', formularioRegistro);
router.post('/registro', registrar);

router.get('/recuperarPassword', recuperarPassword)







export default router