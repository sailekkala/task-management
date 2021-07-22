import React from 'react';
import {Redirect, Route} from 'react-router-dom';

export const PrivateRoute = ({component: Component, roles, ...rest}) => {
    return (
        <Route {...rest} render={props => {
            if (!localStorage.getItem('user')) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
            }

            // logged in so return component
            return <Component {...props} />
        }}/>
    );
}

export default PrivateRoute;
