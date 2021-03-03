<?php
//Коннект к базе данных
include_once  $_SERVER['DOCUMENT_ROOT'].'/api/connectDB.php';

function registration(){
  global $connection;

  //Если запрос был сделать с помощью axios
  $_POST = json_decode(file_get_contents('php://input'), true);

  //Получаем значения с формы
  $errors = '';
  $login = trim($_POST['login']);
  $password = trim($_POST['password']);
  $name = trim($_POST['name']);
  $email = trim($_POST['email']);


  //Проводим валидацию полей формы

  if(empty($login)){$errors .= "Не указан логин ";} 
  if(empty($password)){$errors .= "Не указан пароль ";} 
  if(empty($name)){$errors .= "Не указано имя ";} 
  if(empty($email)){$errors .= "Не указан email ";}
  if(!empty($errors)){
    //Не заполнены обязательные поля
    return array(
      'status'=> 'bad',
      'message'=> $errors
    );
  }

  $password = md5($password);

  // Проверка дублирования данных

  // $query = "SELECT login, email FROM users WHERE `login` = '$login' OR `email` = '$email' LIMIT 1";
  // $stmt = $connection->query($query);
  // $res = $stmt->fetchAll();

  // Если в массив попала хотя бы одна строка из БД значит пользователь с таким login или email уже есть.
  //Данный вариат более безопасный т.к. хакер не знает что конкретно от вводит неправильно

  // if(count($res)>0){
  //   return 'Пользователь с таким логином/email уже существует';
  // }


  //Проверяем существуют ли эти данные в базе данных


  //Совпадает логин и email

  $query = "SELECT login, email FROM users WHERE `login` = '$login' AND `email` = '$email' LIMIT 1";
  $stmt = $connection->query($query);
  $res = $stmt->fetchAll();
  if(count($res)>0){
    // return 'Пользователь с таким логином и email уже существует';
    return array(
      'status'=> 'bad',
      'message'=> 'Пользователь с таким логином и email уже существует'
    );
  }

  //Совпадает логин
  $query = "SELECT login, email FROM users WHERE `login` = '$login' LIMIT 1";
  $stmt = $connection->query($query);
  $res = $stmt->fetchAll();
  if(count($res)>0){
    // return 'Пользователь с таким логином уже существует';
    return array(
      'status'=> 'bad',
      'message'=> 'Пользователь с таким логином уже существует'
    );

  }
  //Совпадает email
  $query = "SELECT login, email FROM users WHERE `email` = '$email' LIMIT 1";
  $stmt = $connection->query($query);
  $res = $stmt->fetchAll();
  if(count($res)>0){
    // return 'Пользователь с таким email уже существует';
    return array(
      'status'=> 'bad',
      'message'=> 'Пользователь с таким email уже существует'
    );
  }


  //Если все проверки пройдены регистрируем пользователя в базе данных 
  //По умолчанию is_admin = 0 т.к. обычный пользователь при регистрации не может быть админом

  $query = "INSERT INTO users (login, email, password, name, is_admin) VALUES ('$login','$email','$password','$name', 0)";
  $stmt = $connection->query($query);

  //rowCount показывает число измененых удаленных или добавленных строк в базу данных
  //Если число больше нуля значит запись прошла успешно
  //На самом деле так проверять не нужно. Нужно проверять исключения при запросе PDO.
  //https://qna.habr.com/q/111361
  if($stmt->rowCount() > 0){

    //При регистрации пользователь сразу авторизуется
    $_SESSION['auth'] = true;



    // $_SESSION['auth']['user'] = $name;
    // $_SESSION['auth']['is_admin'] = 0;
    // return "Вы успешно зарегистрировались";
    return array(
      'status'=> 'good',
      'message'=> 'Вы успешно зарегистрировались',
      'userData' => array(
        'name' => $name,
        'isAdmin'=> 0
      )
    );
  }else{
    // return 'Запись не смогла добавиться в базу данных';
    return array(
      'status'=> 'bad',
      'message'=> 'Запись не смогла добавиться в базу данных'
    );
  }


}



?>