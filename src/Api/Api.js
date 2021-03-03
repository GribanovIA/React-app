import Axios from "axios";
import { BASEURL } from "../CONSTANT/api_constant";

const instance = Axios.create({
  baseURL: process.env.NODE_ENV === "production" ? BASEURL : ''
});
export const auth ={
  authUser(formData) {
    return Axios.post('/api/authorization.php',{
      login: formData.login,
      password: formData.password,
      //Считываем поле submit в login.php если его нет вы не залогинились
      submit: true
    });
  },
  registrationUser(formData){
    return Axios.post('/api/registration.php',{
      login: formData.login,
      password: formData.password,
      name: formData.name,
      email: 'GribanovIvan@gmail.com',
      g_recaptcha_response: formData.g_recaptcha_response,
      //Считываем поле submit в registration.php если его нет вы не зарегистрировались
      submit: true
    });
  }
}