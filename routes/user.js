import express from 'express'
import { isAuthenticated } from "../middlewares/auth.js";
import { register,login, getAllUsers, getMyProile,logout} from '../controllers/user.js';


const router = express.Router();
router.get('/all', getAllUsers);
router.post('/new', register);
router.post('/login', login);
router.get('/logout', isAuthenticated,logout);
router.get("/me", isAuthenticated,getMyProile);


export default router;