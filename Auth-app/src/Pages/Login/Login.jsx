import React from 'react';
import {LoginForm} from './LoginForm';
import './Login.scss';
import { Redirect } from 'react-router-dom';
import { stopSubmit } from 'redux-form';
export const Login = (props)=>{
  if(props.isAuth){
    return <Redirect to="/main" />
  }
  const submitHandler = (formData, dispatch)=>{
    //Возвращаем promise который мы ретурнули из ThunkCreator
    return props.setAuth(formData);
  }
  return(
    <div className='loginPage'>
      <LoginForm onSubmit={submitHandler} setAuthWithVK={props.setAuthWithVK}/>
    </div>
  )
}