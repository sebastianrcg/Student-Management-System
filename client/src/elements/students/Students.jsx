import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './students.css';

const Students = () => {
    const [data, setData] = useState([]);
    const [deleted, setDeleted] = useState(true);
    const [studentStats, setStudentsStats] = useState({
        total: 0,
        active: 0,
        activePercentage: 0
    });

    const tableHeaderStyles = data.length === 0 ?  "no-data"   :  "";  

    useEffect(() => {
        if (deleted) {
            setDeleted(false)

            axios.get('/students')
                .then((res) => {
                    setData(res.data.students);
                    setStudentsStats(res.data.stats)
                }).catch((err) => console.log(err))
        }
    }, [deleted])

    const handleDelete = (id) => {
        axios.delete(`/students/${id}`).then((res) => {
            console.log(res);
            setDeleted(true)
        }).catch((err) => { console.log(err) })
    }
    return (
        <div className="container1 bg-primary dvh-100 dvw-100">
            <h2 className="students-title">Students</h2>
            <div className="d-flex justify-content-end add-student">
                <Link className="btn btn-success" to="/create">Add Student</Link>
            </div>
            <div className="dashboard">
                {/* add dashboard #students #active students %active students */}
                <div className="dashboard-box">
                    <h3>Total Students</h3>
                    <strong>{studentStats.total}</strong>
                </div>
                <div className="dashboard-box">
                    <h3>Active Students</h3>
                    <strong>{studentStats.active}</strong>
                </div>
                <div className="dashboard-box">
                    <h3>% of Active Students</h3>
                    <strong>{studentStats.activePercentage}%</strong>
                </div>
            </div>
            <table className="students-table">
                <thead className={tableHeaderStyles}>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th>Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((student) => {
                            return (<tr>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.age}</td>
                                <td>{student.gender}</td>
                                <td>{student.status ? "Active" : "Inactive"}</td>
                                <td className="actions">
                                    <Link className="btn mx-2 btn-success" to={`/read/${student.id}`}>Read</Link>
                                    <Link className="btn mx-2 btn-secondary" to={`/edit/${student.id}`}>Edit</Link>
                                    <button className="btn mx-2 btn-danger" onClick={() => handleDelete(student.id)}>Delete</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
            
        </div>
    )
}

export default Students;