import React from 'react';
import './App.css';
import Axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import MainContainer from './Pages/Main/MainContainer';
import { LoginContainer } from './Pages/Login/LoginContainer';
import { RegistrationContainer } from './Pages/Registration/RegistrationContainer';
const App = (props)=>{
  return (
    <BrowserRouter>
      <Route path='/' exact component={LoginContainer}/>
      <Route path='/main' exact component={MainContainer}/>
      <Route path='/registration' exact component={RegistrationContainer}/>
    </BrowserRouter>
  );
}

export default App;
