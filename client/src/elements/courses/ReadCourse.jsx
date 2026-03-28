import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import './readcourse.css';

function ReadCourse(){
    const [data, setData] = useState([]);
    const {id} = useParams();

    useEffect(()=>{
        axios.get(`/courses/${id}`)
        .then((res)=>{
            setData(res.data);
        }).catch((err)=> console.log(err))
    }, [id])
    return(
        <div className="container-fluid dvw-100 vh-100 bg-primary content">
            <h2 className="student-title">Course: {id}</h2>
            <Link to="/courses" className="btn btn-success back-btn">Back</Link>
            {
                data.map((course)=>{
                    return (
                        <ul className="list-group student-card">
                            <li className="list-group-item">
                                <b>ID: </b>
                                {course["id"]}
                            </li>
                            <li className="list-group-item">
                                <b>Name: </b>
                                {course["name"]}
                            </li>
                            <li className="list-group-item">
                                <b>Department: </b>
                                {course["department"]}
                            </li>
                            <li className="list-group-item">
                                <b>Professor: </b>
                                {course["professor"]}
                            </li>
                            <li className="list-group-item">
                                <b>Schedule: </b>
                                {course["schedule"]}
                            </li>
                        </ul>
                    )
                })
            }
            
        </div>
    )
}

export default ReadCourse;