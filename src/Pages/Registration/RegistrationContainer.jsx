import React from 'react';
import { connect } from 'react-redux';
import { setAuthTC, setAuthWithVkTC, registrationTC } from '../../Reducers/auth-reducer';
import { Registration } from './Registration';
const mapStateToProps = (state)=>({
  isAuth: state.auth.isAuth
});

const mapDispathToProps = {
  setAuth: setAuthTC,
  setAuthWithVK: setAuthWithVkTC,
  registration: registrationTC
}

export const RegistrationContainer = connect(mapStateToProps, mapDispathToProps)(Registration);