const pool = require('../model/database');
const express = require('express');


const coursesRouter = express.Router();

coursesRouter.post('/', (req, res)=> {
    const sql = "INSERT INTO courses (name, department, professor, schedule, days) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    
    const values = [
        req.body.name,
        req.body.department,
        req.body.professor,
        req.body.schedule,
        req.body.days
    ];

    pool.query(sql, values, (error, results)=>{
        if (error) return res.json({message: 'Something unexpected has ocurred' + error});
        return res.json({success: "Course created successfully"})
    })
});

coursesRouter.get('/', (req, res)=>{
    const sql = 'SELECT * FROM courses order by id asc';
    pool.query(sql, (error, results)=>{
        if (error) res.json({message: "Server Error"});
        return res.json(results.rows);
    })
})

coursesRouter.get('/:id', async (req, res)=>{
    const id = req.params.id;
    const sql = `SELECT * FROM courses WHERE id=$1`;
    const results = await pool.query(sql, [id]);

    const days = results.rows[0].days ? results.rows[0].days.split(", "): [];
    const updatedResults = {
        ...results.rows[0], days: days
    }
    res.json(updatedResults);
})

coursesRouter.put('/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const values = [
        req.body.name,
        req.body.department,
        req.body.professor,
        req.body.schedule

    ]
    const sql = `UPDATE courses set name=$1, department=$2, professor=$3, schedule=$4 where id=${id}`;
    pool.query(sql, values, (error, results)=>{
        if (error) res.json({message: "Something went wrong"});
        return res.json({success: "Course Updated"});
    })
});

coursesRouter.delete('/:id', (req, res)=>{
    const id = req.params.id;
    const sql = `DELETE from courses where id=${id}`;
    pool.query(sql, (error, results)=>{
        if (error) res.json({message: "Something went wron"});
        return res.json({success: "Course Deleted"});
    })
})

module.exports = coursesRouter;