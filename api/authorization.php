<?php
session_start();
//Подключаем функци авторизации  authorization()
include_once $_SERVER['DOCUMENT_ROOT']."/api/models/authorization_model.php";

//Если запрос был сделать с помощью axios
$_POST = json_decode(file_get_contents('php://input'), true);

//Пользователь нажал кнопку submit
if(isset($_POST['submit'])){
  //Функция производит авторизацию и возвращает сообщение при (успехе/ неудаче);
  echo json_encode(authorization());
  exit;
}else{
  $response = array('status' => 'bad', 'message' => 'Вы не авторизировались');
  echo json_encode($response);
  exit;
}

//Если пользователь уже логинился и с ним существует сессия
if(isset($_SESSION['auth'])){
  $response = array('status' => 'good', 'message' => 'Ваша сессия успешно авторизована');
  echo json_encode($response);
  exit;
}


?>