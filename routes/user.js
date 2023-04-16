import express from 'express'
import { User } from "../model/user.js"
import { createNewUser, deleteUser, getAllUsers, getUserDetails, specialUser, updateUser } from '../controllers/user.js';


const router = express.Router();
router.get('/all', getAllUsers);
router.post('/new', createNewUser);
router.get('/userid/special', specialUser)
//dynamic routing


router.get("/userid/:id", getUserDetails);
router.put("/userid/:id", updateUser);
router.delete("/userid/:id", deleteUser);


router.route("/userid/:id")
    .get(getUserDetails).
    put(updateUser)
    .delete(deleteUser);

export default router;