import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./editcourse.css";

const EditCourse = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/courses/${id}`)
            .then((res) => {
                setData([res.data]);
                console.log(res)
            }).catch((err) => console.log(err))
    }, [id])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prev => ([{
            ...prev[0], [name]: value
        }]
        ))
    }

    const handleDaysChange = (event) =>{
        const {value, checked} = event.target;
        setData(prev => {
            if (checked) {
                return [{...prev[0], days : [...prev[0].days, value]}]; 
            } else {
                return [{...prev[0], days : prev[0].days.filter(day=> day !== value)}];
            }
        })

    }

    function handleSubmit(event) {
        event.preventDefault();
        const mergedDays = data[0].days.join(", ");
        const updatedValues = {
            ...data[0], days: mergedDays
        }

        axios.put(`/courses/${id}`, updatedValues).then((res) => {

            navigate('/courses');
            console.log(res);
        }).catch((err) => console.log(err));

    }

    return (
        <div className="container-fluid dvw-100 vh-100 bg-primary content">
            <h2 className="student-id">Course {id}</h2>
            <Link to="/courses" className="btn btn-success back-btn">Back</Link>
            {
                data.map((course) => {
                    return (
                        <form className="edit-form" onSubmit={handleSubmit}>
                            <div className="form-group my-3">
                                <label htmlFor="name">Name:     </label>

                                <input type="text" name="name" value={data[0].name} onChange={handleChange} />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="department">Department: </label>

                                <input type="text" name="department" value={data[0].department} onChange={handleChange} />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="professor">Professor: </label>

                                <input type="text" name="professor" value={data[0]["professor"]} onChange={handleChange} />
                            </div>
                            <div className="form-group my-3">
                                <label htmlFor="schedule">Schedule: </label>

                                <input type="text" name="schedule" value={data[0]["schedule"]} onChange={handleChange} />
                            </div>

                            <p>Select Days: </p>
                            <div className="form-days">
                                {
                                    days.map(day => {
                                        return (
                                            <div key={day} className="form-days-checks">

                                                <label htmlFor={`form-${day}`}>
                                                    {day}
                                                </label>
                                                <input type="checkbox" id={`form-${day}`} value={day} checked={data[0].days.includes(day)} name={day} onChange={handleDaysChange} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <p>{data[0].days}</p>

                            <div className="form-group my-3">
                                <button type="submit" className="btn btn-success">Save</button>
                            </div>
                        </form>
                    )
                })
            }

        </div>
    )
}


export default EditCourse;