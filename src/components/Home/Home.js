import React from "react";

import './Home.scss';
import {useSelector} from "react-redux";

export const Home = () => {

    const user = useSelector(state => state.authentication.user);

    return (
        <div className="home_wrapper">
            <h2>Welcome to  {user && user.userName}</h2>
        </div>
    )
}

export default Home;
