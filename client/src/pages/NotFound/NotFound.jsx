import classes from './notfound.module.css';
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
    const navigate = useNavigate();

    const goBack = ()=> {
        navigate(-1);
    }


    return (
        <div className={classes.page}>
            <h2>404 Page not found</h2>
            <button onClick={goBack}>Go back</button>

        </div>
    )
}

export default NotFound;