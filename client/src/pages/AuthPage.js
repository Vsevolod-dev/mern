import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setFrom] = useState({
        login: "",
        password: ""
    })

    useEffect(() => {
        window.M.updateTextFields()
    }, []);


    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = (event) => {
      setFrom({...form, [event.target.name]: event.target.value})
    }
    
    const registerHandler = async () => {
      try {
          const data = await request('/api/auth/register', 'POST', {...form})
          window.M.toast({html: data})
      } catch (e) {}
    }

    const loginHandler = async () => {
        const data = await request('/api/auth/login', 'POST', {...form})
        auth.login(data.token, data.userId)
    }

    const pressHandler = async (event) => {
        if (event.key === 'Enter') {
            await loginHandler()
        }
    }

    return (
        <div className={'row'}>
            <div className="col s6 offset-s3">
                <h1>Shorten link</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Auth</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter login"
                                    id="login"
                                    type="text"
                                    name="login"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                />
                                <label className="active" htmlFor="login">Login</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    onChange={changeHandler}
                                    onKeyPress={pressHandler}
                                />
                                <label className="active" htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            onClick={loginHandler}
                            style={{marginRight: 10}}
                            disabled={loading}
                        >
                            Log in
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};