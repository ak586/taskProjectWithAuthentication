import express from "express";
import mongoose from "mongoose";

const app = express();
//using a midddleware 
app.use(express.json());
const url = "mongodb://localhost:27017";
mongoose.connect(url, {
    dbName: "backendapi"
})
    .then(() => console.log("connected to the database"))
    .catch(e => console.log(e));


const schema = new mongoose.Schema({
    name: String,
    email: String,
    password:String
})

const User = mongoose.model('user',schema);


app.get('/', (req, res) => res.send("<h1>hey it's working</h1>"));

app.post('/users/new', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
 await User.create({
        name,
        email,
        password,
 });
    //status code 201 means created
    res.status(201).json({
        success: true,
        message: "Registered successfully",
    });
})

app.get('/users/all', async (req, res) => {
    const users = await User.find({ });

    res.json({
        success: true,
        users,
    })
})

app.get('/userid/special', (req, res) => {
    res.json({
        success: true,
        message: "bhutiya banaya",
    })
})



//dynamic routing
app.get("/userid/:id", async(req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json({
        success: true,
        user,
    })

})







app.listen(3001, () => console.log("server running at 3001"));