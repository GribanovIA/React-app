import React from 'react';
import { connect } from 'react-redux';
import Main from './Main';
const mapStateToProps = (state)=>({
  isAuth: state.auth.isAuth,
  userData: state.auth.userData
});

const mapDispathToProps = {
  
}

export default connect(mapStateToProps, mapDispathToProps)(Main);