const express = require('express');
const cors = require('cors');

const path = require('path');
const morgan = require('morgan');
const studentsRouter = require('./routes/students')
const coursesRouter = require('./routes/courses')

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))

const port = 5000;

app.use('/students' ,studentsRouter);
app.use('/courses', coursesRouter);

app.post('/login' , (req, res)=> {
    const user = {
        userEmail: "sebalox92@gmail.com",
        userPass: "sebas92",
        username: "Sebalox"
    }
    
    const {email, password} = req.body;

    if (email === user.userEmail && password === user.userPass){
        return res.json({
            validated: true,
            username: user.username
        })
    } else {
        return res.json({
            validated: false
        })
         
    }


});


app.listen(port, ()=> {
    console.log(`Server listening on Port: ${port}`);
});