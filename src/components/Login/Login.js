import React, {useEffect, useState} from "react";
import './Login.scss';
import {TextField} from "@material-ui/core";
import CustomButton from "../../Comman/custom-button/custom-button";
import {loginUser, logOutUser} from "../../store/actions/authActions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from 'react-router-dom';
import {alertClear} from "../../store/actions/alertActions";

const initialFormValues = {
    userName: "Demo",
    password: "demo@123"
};


export const Login = () => {
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();
    const location = useLocation();
    let history = useHistory();


    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertClear());
        });
        dispatch(logOutUser());
    }, [dispatch, history]);

    const validate = (fieldValues = values) => {
        let temp = {...errors};

        if ("userName" in fieldValues) {
            temp.userName = fieldValues.userName ? "" : "This field is required.";
            if (fieldValues.userName) {
                temp.userName = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/.test(fieldValues.userName) ? "" : ' Special characters not allowed';
            }
        }

        if ("password" in fieldValues) {
            temp.password = fieldValues.password ? fieldValues.password.length < 8 ? 'Minimum 8 Characters required' : "" : "This field is required.";
        }

        setErrors({
            ...temp
        });
    };
    const handleInputValue = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value
        });
        validate({[name]: value});
    };

    const formIsValid = (fieldValues = values) => {
        return fieldValues.userName &&
            fieldValues.password &&
            Object.values(errors).every((x) => x === "");
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const isValid = Object.values(errors).every((x) => x === "") && formIsValid();
        if (isValid) {
            dispatch(loginUser(values));
            if (localStorage.getItem('user')) {
                const {from} = location.state || {from: {pathname: "/"}};
                history.push(from)
            }

        }
    };


    return (
        <div className="login_wrapper">
            <div className="container">
                <div className='form_container'>
                    <div className='login_wrapper_card col-md-6'>
                        <div className='login_card_header'>
                       <span className='login_title_header'>
                           Login
                       </span>
                        </div>
                        <div className='login_card_content'>
                            {alert.message && (
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                            )}
                            <form onSubmit={handleFormSubmit} noValidate autoComplete="off">
                                <div className="d-flex flex-column">
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="User Name"
                                        value={values.userName}
                                        onChange={handleInputValue}
                                        onBlur={handleInputValue}
                                        name='userName'
                                        variant="outlined"
                                        required
                                        autoComplete="none"
                                        {...(errors['userName'] && {
                                            error: true,
                                            helperText: errors['userName']
                                        })}
                                    />
                                    <TextField
                                        id="outlined-error-helper-text"
                                        label="Password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleInputValue}
                                        onBlur={handleInputValue}
                                        name='password'
                                        variant="outlined"
                                        required
                                        autoComplete="none"
                                        {...(errors['password'] && {
                                            error: true,
                                            helperText: errors['password']
                                        })}
                                    />
                                </div>
                                <div className='info'>
                                    <span>User Name : Demo</span>
                                    <span>Password : demo@123</span>
                                </div>
                                <div className='buttons'>
                                    <CustomButton type='submit' disabled={!formIsValid()}>Login</CustomButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
