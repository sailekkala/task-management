import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home/Home';
import Jokes from './components/Jokes/Jokes';

import Login from './components/Login/Login';
import ViewTask from './components/Task/ViewTask';
import CreateTask from "./components/Task/CreateTask";
import EditTask from "./components/Task/EditTask";
import PrivateRoute from "./Comman/PrivateRoute";
import React from "react";
import {useSelector} from "react-redux";


function App() {
    const user = useSelector(state => state.authentication.user);
    return (
        <BrowserRouter forceRefresh>
            <div className="myApp">
                {!user ? '' : <Header/>}
                <div className="app-container" style={{height : !localStorage.getItem('user') ? '100%' : 'calc(100% - 64px)'}}>
                    <Switch>
                        <PrivateRoute path="/" exact component={Home}/>
                        <PrivateRoute path="/viewTask" exact component={ViewTask}/>
                        <PrivateRoute path="/createTask" exact component={CreateTask}/>
                        <PrivateRoute path="/editTask/:id" exact component={EditTask}/>
                        <PrivateRoute path="/jokes" exact component={Jokes}/>
                        <Route path="/login" exact component={Login}/>
                        <Redirect from="*" to="/"/>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
