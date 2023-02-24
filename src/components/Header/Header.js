import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import logo from '../../images/Logo.svg';
import './Header.css';

const Header = () => {

    const {logOut,user} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = () =>{
        logOut()
        .then(()=>{
            navigate('/')
            console.log("sign Out");

        })
        .catch((error) =>[
            console.error(error.message)
        ])
    }


    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {
                user ?   <Link to="/"><button onClick={handleSignOut}>Sign Out</button></Link> : <Link to="/login">Login</Link>
                }
                {/* <Link to="/"><button onClick={handleSignOut}>Sign Out</button></Link> */}
            </div>
        </nav>
    );
};

export default Header;