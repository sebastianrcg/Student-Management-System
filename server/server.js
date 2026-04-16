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


app.listen(port, ()=> {
    console.log(`Server listening on Port: ${port}`);
});