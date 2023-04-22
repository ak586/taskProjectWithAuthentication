import express from 'express'
import { isAuthenticated } from "../middlewares/auth.js";
import { register,login, getMyProile,logout} from '../controllers/user.js';


const router = express.Router();
router.post('/new', register);
router.post('/login', login);
router.get('/logout', isAuthenticated,logout);
router.get("/me", isAuthenticated,getMyProile);


export default router;