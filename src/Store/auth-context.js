import React, { useState } from "react";

const AuthContext = React.createContext({
    token:'',
    isLoggedIn: false,
    login:(token)=>{},
    logout: ()=>{}
})

export const AuthContextProvider = (props) =>{
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const [logoutTimer, setLogoutTimer] = useState(null);

    const userIsLoggedIn = !!token; // it will convert the varible to boolean values

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
        setupLogoutTimer();
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        clearTimeout(logoutTimer);
    }

    const setupLogoutTimer = () =>{
        if(logoutTimer){
            clearTimeout(logoutTimer);
        }
        const timer =setTimeout(()=>{
            logoutHandler();
        }, 300000);
        setLogoutTimer(timer);
    }
    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;