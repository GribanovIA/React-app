import { auth } from "../Api/Api"
import { stopSubmit, SubmissionError } from "redux-form"
/* global VK */

const SET_AUTH = "SET_AUTH"
const SET_AUTH_WITH_VK = 'SET_AUTH_WITH_VK';
const FETCHING_START = 'FETCHING_START';
const FETCHING_ERROR = 'FETCHING_ERROR';

export const setAuthAC = (auth=false, userData={})=>{
  return{
    type: SET_AUTH,
    auth,
    userData
  }
}

export const fetchingStart = ()=>{
  return {
    type: FETCHING_START,
    isFetching: true,
    error: ''
  }
}

export const fetchingError = ()=>{
  return {
    type: FETCHING_ERROR,
    isFetching: false,
    error: 'Не удалось авторизоваться'
  }
}


export const setAuthWithVkAC = (userData) =>{
  return {
    type: SET_AUTH_WITH_VK,
    userData,
    auth: true,
    isFetching: false
  }
}

export const setAuthWithVkTC = ()=>(dispatch)=>{
  console.log('Санка запустилась');
  //Начало отправки запроса на аутентификацию
  dispatch(fetchingStart());
  //Асинхронный запрос в vk
  VK.Auth.login((response)=>{
    if(response.session){
      console.log('Запрос к vk прошел успешно',response.session.user);
      dispatch(setAuthWithVkAC(response.session.user));
    }else{
      dispatch(fetchingError());
    }
  },4);
}


export const setAuthTC = (formData) => (dispatch) => {
  //Возвращаем промис. Для того чтобы сделать действия после запроса
  //Если возвращаем промис то перестает работать AC stopSubmit
    return auth.authUser(formData)
    .then((response)=>{
      console.log(response);
      if(response.data.status === 'good'){
        console.log(response);

        //Добавил новый параметр userData на будущее
        dispatch(setAuthAC(true, response.data.userData));
      }
      if (response.data.status === 'bad'){
        let error = new Error(response.data.message);
        throw error;
      }
    })
    .catch((e)=>{
        console.log(e);
        throw new SubmissionError({_error: e.message});
    });
}

export const registrationTC = (formData) => (dispatch)=>{
  console.log(formData);
  return auth.registrationUser(formData)
    .then((response)=>{
      if(response.data.status === 'good'){
        //Авторизовываем пользователя если регистрация прошла успешно
        dispatch(setAuthAC(true,response.data.userData));
      }else{
        throw new Error(response.data.message);
      }
    })
    .catch((e)=>{
      throw new SubmissionError({_error: e.message});
    });
}




let initialState = {
  userData: null,
  isAuth: false,
  isFetching: false,
  error: ''
}

export const authReducer = (state = initialState, action)=>{
  switch(action.type){
    case SET_AUTH:
      return{
        ...state,
        isAuth: action.auth,
        userData: action.userData
      };
    case FETCHING_START:
      return{
        ...state,
        isFetching: action.isFetching,
        error: action.error
      }
    case FETCHING_ERROR:
      return{
        ...state,
        isFetching: action.isFetching,
        error: action.error
      }
    case SET_AUTH_WITH_VK:
      return{
        ...state,
        isFetching: action.isFetching,
        isAuth: action.auth,
        userData: action.userData
      }
    default:
      return state;
  }
}