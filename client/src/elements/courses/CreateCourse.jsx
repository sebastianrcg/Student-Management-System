import React from "react";
import { useState } from "react";
import axios from "axios";
import './createcourse.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
    const [values, setValues] = useState({
        name: "",
        department: "",
        professor: "",
        schedule: "",
        days: []
    })

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues(prev => ({
            ...prev, [name]: value
        }
        ))
    }

    function handleSubmit(event) {
        event.preventDefault();

        axios.post('/courses', values).then((res) => {

            navigate('/courses');
            console.log(res);
        }).catch((err) => console.log(err));

    }

    return (
        <div className="container-fluid dvw-100 bg-primary vh-100 content">
            <div>
                <h2 className="section-title">Add Course</h2>
                <div className="d-flex justify-content-end">
                    <Link to="/courses" className="btn btn-success btn-students">Courses</Link>
                </div>
                <form className="create-form" onSubmit={handleSubmit}>
                    <div className="form-group my-3">
                        <label htmlFor="name">Name: </label>
                        <input type="text" name="name" value={values.name} onChange={handleChange} />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="department">Department: </label>
                        <input type="text" name="department" value={values.department} onChange={handleChange} />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="professor">Professor: </label>
                        <input type="text" name="professor" value={values.professor} onChange={handleChange} />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="schedule">Schedule: </label>
                        <input type="text" name="schedule" value={values.schedule} onChange={handleChange} />
                    </div>
                    {/* Days Checkbox Input */}
                    <p>Select Days: </p>
                    <div className="form-days">
                        {
                            days.map(day => {
                                return (
                                    <div key={day} className="form-days-checks">

                                        <label htmlFor={`form-${day}`}>
                                            {day}
                                        </label>
                                        <input type="checkbox" id={`form-${day}`} value={day} checked={values.days.includes(day)} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="form-group my-3">
                        <button type="submit" className="btn btn-success">Save</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default CreateCourse;