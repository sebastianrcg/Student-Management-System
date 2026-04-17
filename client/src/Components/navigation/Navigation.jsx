import React from "react";
import { NavLink } from "react-router-dom";
import './navigation.css';
import { useAuth } from "../../Context/AuthContext";
import classes from './navigation.module.css'

const Navigation = () => {
    const { session, signOut } = useAuth();

    return (
        <nav className="navigation-section">
            <ul className="navigation-bar">
                <li><NavLink className="navigation-items" to={"/"}>Home</NavLink></li>
                <li><NavLink className="navigation-items" to={"/"}>Students</NavLink></li>
                <li><NavLink className="navigation-items" to={"/courses"}>Courses</NavLink></li>
                <li><NavLink className="navigation-items" to={"/assigncourse"}>Assign Course</NavLink></li>
            </ul>
            <div className={classes.userInfo}> 
                <p>{session.username}</p>
                <button onClick={signOut}>Log Out</button>

            </div>
        </nav>
    )
}

export default Navigation;