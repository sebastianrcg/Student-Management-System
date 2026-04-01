import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './courses.css';

const Courses = () => {
    const [data, setData] = useState([]);
    const [deleted, setDeleted] = useState(true);

    const tableHeaderStyles = (data.length === 0) ? "no-data" : "";

    useEffect(() => {
        if (deleted) {
            setDeleted(false)

            axios.get('/courses')
                .then((res) => {
                    setData(res.data);
                }).catch((err) => console.log(err))
        }
    }, [deleted])

    const handleDelete = (id) => {
        axios.delete(`/courses/${id}`).then((res) => {
            console.log(res);
            setDeleted(true)
        }).catch((err) => { console.log(err) })
    }
    return (
        <div className="container1 bg-primary dvh-100 dvw-100">
            <h2 className="students-title">Courses</h2>
            <div className="d-flex justify-content-end add-student">
                <Link className="btn btn-success" to="/createCourse">Add Course</Link>
            </div>
            <table className="students-table">
                <thead className={tableHeaderStyles}>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Professor</th>
                        <th>Schedule</th>
                        <th>Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((course) => {
                            return (<tr>
                                <td>{course.id}</td>
                                <td>{course.name}</td>
                                <td>{course.department}</td>
                                <td>{course.professor}</td>
                                <td>{course.schedule}</td>
                                <td className="actions">
                                    <Link className="btn mx-2 btn-success" to={`/readCourse/${course.id}`}>Read</Link>
                                    <Link className="btn mx-2 btn-secondary" to={`/editCourse/${course.id}`}>Edit</Link>
                                    <button className="btn mx-2 btn-danger" onClick={() => handleDelete(course.id)}>Delete</button>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Courses;