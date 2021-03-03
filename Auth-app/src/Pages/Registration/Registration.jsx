import React from 'react';
import RegistrationForm from './RegistrationForm';
import './Registration.scss';
import { Redirect } from 'react-router-dom';
import { stopSubmit } from 'redux-form';

/* global grecaptcha */

export const Registration = (props) => {
  if (props.isAuth) {
    return <Redirect to="/main" />
  }
  const submitHandler = (formData, dispatch) => {
    //Возвращаем promise который мы ретурнули из ThunkCreator
    let g_recaptcha_response = grecaptcha.getResponse();
    formData = { ...formData, g_recaptcha_response};
    return props.registration(formData);
  }
  return (
    <div className='loginPage'>
      <RegistrationForm onSubmit={submitHandler} />
    </div>

  )
}