import { useState } from "react"
import classes from './login.module.css';
import { useNavigation } from "react-router-dom";
import axios from "axios";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigation();

    const emailChange = (e) => {
        setEmail(e.target.value);
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    } 


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={emailChange}/>
                <input type="password" placeholder="Password" value={password} onChange={passwordChange}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;