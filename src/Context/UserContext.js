import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import app from '../firebase/firebase.config';
export const AuthContext = createContext();

const UserContext = ({children}) => {

    const [user,setUser] = useState();
    const [loading,setLoading] = useState(true);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const signUp = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const signIn = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }


    const logOut = () =>{
        return signOut(auth);
    }


    const googleSignIn = () =>{
        setLoading(true);
        return signInWithPopup(auth,provider);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            setUser(user);
            setLoading(false);
        })

        return () => unsubscribe();
    },[])


    const authInfo = {signUp,signIn,logOut,googleSignIn,user,loading};


    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
            
        </div>
    );
};


export default UserContext;