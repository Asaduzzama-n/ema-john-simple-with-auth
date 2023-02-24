import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import './Login.css'
const Login = () => {

    const {signIn,googleSignIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLoginFormSubmit = (event) =>{
        event.preventDefault();
        
        const form = event.target;

        const email = form.email.value;
        const password = form.password.value;

        signIn(email,password)
        .then(userCredential => {
            const user = userCredential.user;
            navigate(from,{replace:true});
            console.log(user);
        })
        .catch(error =>{
            console.error(error.message);
        })
    }

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(userCredential => {
            const user = userCredential.user;
            navigate(from,{replace:true})
            console.log(user);
        })
        .catch(error => {
            console.error(error.message);
        })
    }

    return (
        <div>
            <form onSubmit={handleLoginFormSubmit}>
                <div className="sign-up">
                    <h1>LOGIN</h1>
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required />
                </div>

                <div className="bottom-part">
                    <button type='submit' className='signUp-button'>SIGN UP</button>
                    <p><small>New to Ema-john? <Link to={'/signup'}>Create New Account</Link></small></p>
                    <br />
                    <hr />

                    <button onClick={handleGoogleSignIn} className='google-button'>Continue With Google</button>
                </div>
            </form>
        </div>
    );
};

export default Login;