import React from 'react';
import { connect } from 'react-redux';
import { setAuthTC, setAuthWithVkTC } from '../../Reducers/auth-reducer';
import { Login } from './Login';
const mapStateToProps = (state)=>({
  isAuth: state.auth.isAuth
});

const mapDispathToProps = {
  setAuth: setAuthTC,
  setAuthWithVK: setAuthWithVkTC
}

export const LoginContainer = connect(mapStateToProps, mapDispathToProps)(Login);