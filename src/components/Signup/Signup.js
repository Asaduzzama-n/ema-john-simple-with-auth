import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import './Signup.css'
const Signup = () => {
    
    const {signUp,googleSignIn} = useContext(AuthContext);
    const [error,setError] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleFormSubmit = (event) =>{
        event.preventDefault();
        
        const form = event.target;

        const email = form.email.value;
        const password = form.password.value;
        const c_password = form.password2.value;
        
        if(password !== c_password){
            setError("Password didn't match")
            return;
        }else{
        signUp(email,password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log(user);
        })
        .catch(error => {
            console.error(error.message);
        })

        }
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
            <form onSubmit={handleFormSubmit}>
                <div className="sign-up">
                    <h1>SIGN UP</h1>
                </div>
                <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" required />

                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" required />

                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" name="password2" id="password2" required />
                </div>

                <div className="bottom-part">
                    
                    {error && <p className='error'><small>*{error}</small></p>}
                    <button type='submit' className='signUp-button'>SIGN UP</button>
                    <p><small>ALready have an account? <Link to={'/login'}>Login</Link></small></p>
                    <br />
                    <hr />

                    <button onClick={handleGoogleSignIn} className='google-button'>Continue With Google</button>

                </div>
            </form>
        </div>
    );
};

export default Signup;