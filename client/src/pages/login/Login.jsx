import { useState } from "react"
import classes from './login.module.css';
import { useNavigate} from "react-router-dom";
import axios from "../../axiosConfig";
import { useAuth } from "../../Context/AuthContext";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fail, setFail] = useState(null);

    const {setSession} = useAuth();
    const navigate = useNavigate();

    const emailChange = (e) => {
        setEmail(e.target.value);
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        setFail(null);
        setEmail("");
        setPassword("")
        const response = await axios.post('/login', {email, password});

        if (!response.data.validated){
            setFail("Wrong email or password.");
        } else if ( response.data.validated){
            setSession({
                username: response.data.username
            });
            navigate('/');

        } else {
            setFail("Something went wrong, please try again.")
        }
    } 


    return (
        <div className={classes.page}>
            <form onSubmit={handleSubmit} className={classes.login}>
                <h2>Login</h2>
                <input type="email" placeholder="Email" value={email} onChange={emailChange} required/>
                <input type="password" placeholder="Password" value={password} onChange={passwordChange} required/>
                {fail && <p className={classes.fail}>{fail}</p>}
                <button type="submit" >Login</button>
            </form>
        </div>
    )
}

export default Login;