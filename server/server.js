const express = require('express');
const cors = require('cors');
const session = require("express-session");

const path = require('path');
const morgan = require('morgan');
const studentsRouter = require('./routes/students')
const coursesRouter = require('./routes/courses')

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(morgan("dev"))

app.use(session({
    secret: "Supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60*24    
        // 1 day cookie
    }
}))

const port = 5000;

app.use('/students' ,studentsRouter);
app.use('/courses', coursesRouter);

app.post('/login' , (req, res)=> {
    const users = [{
        userEmail: "sebalox92@gmail.com",
        userPass: "sebas92",
        username: "Sebalox"
    },
    {
        userEmail: "tguenen@gmail.com",
        userPass: "tguenen",
        username: "TaniaG"
    },
    {
        userEmail: "sebalox@gmail.com",
        userPass: "sebas",
        username: "Sebastian"
    }
]
    
    const {email, password} = req.body;

    const result = users.find((user)=> user.userEmail === email );

    if (result === undefined) {
        return res.json({
            validated: false
        })
    } else if (result.userPass === password) {
        return res.json({
            validated: true,
            username: result.username
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