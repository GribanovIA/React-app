<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/api/models/registration_model.php';

// однократное включение файла autoload.php (клиентская библиотека reCAPTCHA PHP)
require_once $_SERVER['DOCUMENT_ROOT'].'/api/recaptcha/autoload.php';

//Получаем данные из axios запроса
$_POST = json_decode(file_get_contents("php://input"),true);

// //Пользователь нажал кнопку submit
// if(isset($_POST['submit'])){
//   //Функция производит регистрацию и возвращает сообщение при (успехе/ неудаче)
//   echo json_encode(registration());
// }else{
//   $response = array(
//     'status' => 'bad',
//     'message' => 'Вы не зарегистрировались'
//   );
//   echo json_encode($response);
//   exit;
// }


// ваш секретный ключ
$secret = '6LeZq_oUAAAAAO-cDzVDbG6ErMLDv9dOs4lhlhq2';
// если в массиве $_POST существует ключ g-recaptcha-response, то...
if (isset($_POST['g_recaptcha_response']) && !empty($_POST['g_recaptcha_response'])) {
  // создать экземпляр службы recaptcha, используя секретный ключ
  $recaptcha = new \ReCaptcha\ReCaptcha($secret);
  // получить результат проверки кода recaptcha
  $resp = $recaptcha->verify($_POST['g_recaptcha_response'], $_SERVER['REMOTE_ADDR']);
  // если результат положительный, то...
  if ($resp->isSuccess()){
    // действия, если код captcha прошёл проверку
    //...





    //Пользователь нажал кнопку submit
    if(isset($_POST['submit'])){
      //Функция производит регистрацию и возвращает сообщение при (успехе/ неудаче)
      echo json_encode(registration());
    }else{
      $response = array(
        'status' => 'bad',
        'message' => 'Вы не зарегистрировались'
      );
      echo json_encode($response);
      exit;
    }







  } else {
    // иначе передать ошибку

    // $errors = $resp->getErrorCodes();
    // $data['error-captcha']=$errors;
    // $data['msg']='Код капчи не прошёл проверку на сервере';
    // $data['result']='error';

    $response = array(
        'status' => 'bad',
        'message' => 'Код капчи не прошёл проверку на сервере. Вы ебаный бот'
      );
    echo json_encode($response);
    exit;





  }

} else {
  //ошибка, не существует ассоциативный массив $_POST["send-message"]
  $response = array(
        'status' => 'bad',
        'message' => 'Вы не ввели каптчу'
      );
    echo json_encode($response);
    exit;


}










?>