<?php
session_start();
//Соединение с базой данных переменная $connect
include_once  $_SERVER['DOCUMENT_ROOT'].'/api/connectDB.php';

function authorization(){
  global $connection;
  //Если запрос был сделать с помощью axios
  $_POST = json_decode(file_get_contents('php://input'), true);

  $login = $_POST['login'];
  $password = $_POST['password'];
  // Если хотя бы одно поле пустое - ошибка
  if(empty($login) OR empty($password)){
    $response = array(
      'status' => 'bad',
      'message' => 'Поля логин/пароль обязательны к заполнению'
    );
    // echo json_encode($response);
    return $response;
  }else{
    $password = md5($password);
    //Проверяем есть ли пользователь с таким логином и паролем
    
    $query = "SELECT name, is_admin FROM users WHERE `login` = '$login' AND `password` = '$password' LIMIT 1";
    $stmt = $connection->query($query);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    //Если запрос что-то возвращает значит такой пользователь существует и мы проводим авторизацию
    if(count($result) == 1){
      $userName = $result[0]['name'];
      $isAdmin = $result[0]['is_admin'];
      $response = array(
        'status' => 'good',
        'message' => 'Вы успешно авторизировались',
        'userData' => array(
          'name' => $userName,
          'isAdmin' => $isAdmin
        )
      );
      //Устанавливаем сессию для пользователя
      $_SESSION['auth'] = true;
      // echo json_encode($response);
      return $response;
    }else{
      $response = array(
        'status' => 'bad',
        'message' => 'Логин/пароль введены неверно'
      );
      // echo json_encode($response);
      return $response;
    }
  }
}


?>