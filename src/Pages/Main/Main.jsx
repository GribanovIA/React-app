import React from 'react';
import { Redirect } from 'react-router-dom';

const Main = (props)=>{
  //Защищаем маршрут. Можно заходить есть есть авторизация
  if(!props.isAuth){
    return <Redirect to='/'/>
  }
  return (
    <div>
      <h1>Добро пожаловать {props.userData.first_name} {props.userData.last_name} ;)</h1>
      <p>Это ваш профиль в вк ? <a href={props.userData.href}>Ссыль</a></p>
    </div>
  );
}

export default Main;