const pool = require('../model/database');
const express = require('express');

const studentsRouter = express.Router();


studentsRouter.post('/', (req, res) => {
    const sql = "INSERT INTO student_details (name, email, age, gender) VALUES ($1,$2,$3,$4) returning *";
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender
    ];

    pool.query(sql, values, (error, results) => {
        if (error) return res.json({ message: 'Something unexpected has ocurred' + error });
        return res.json({ success: "Student added successfully" })
    })
})

studentsRouter.get('/', async (req, res) => {
    const sqlResults = 'SELECT * FROM student_details order by id asc';
    const results = await pool.query(sqlResults);

    const statsQuery = `SELECT COUNT(*) as totalStudents, COUNT(*) FILTER (WHERE status = true ) as activeStudents FROM student_details`;
    const resultStats = await pool.query(statsQuery)

    const total = parseInt(resultStats.rows[0].totalstudents, 10);
    const active = parseInt(resultStats.rows[0].activestudents, 10);
    const activePercentage = total > 0 ? ((active / total) * 100).toFixed(2) : 0;

    const stats = {
        total: total,
        active: active,
        activePercentage: activePercentage
    };
    

    return res.json({
        students: results.rows,
        stats: stats
    })

    // pool.query(sql, (error, results)=>{
    //     if (error) res.json({message: "Server Error"});
    //     return res.json(results.rows);
    // })
})

studentsRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM student_details WHERE id=$1`;
    pool.query(sql, [id], (error, results) => {
        if (error) res.json({ message: "Something went wrong" });
        return res.json(results.rows);
    })
})

studentsRouter.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const values = [
        req.body.name,
        req.body.email,
        req.body.age,
        req.body.gender,
        req.body.status

    ]
    const sql = `UPDATE student_details set name=$1, email=$2, age=$3, gender=$4, status=$5 where id=${id}`;
    pool.query(sql, values, (error, results) => {
        if (error) res.json({ message: "Something went wrong" });
        return res.json({ success: "Student Updated" });
    })
});

studentsRouter.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE from student_details where id=${id}`;
    pool.query(sql, (error, results) => {
        if (error) res.json({ message: "Something went wron" });
        return res.json({ success: "Student Deleted" });
    })
})

module.exports = studentsRouter;