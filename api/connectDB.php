<?php

//Development connect data

// //Имя хоста
// define("DBHOST", "react-api");
// //Логин генерируется при создании базы данных / darcos13
// define("DBUSER", "root");
// //Пароль генерируется при создании базы данных / 412276889Aa
// define("DBPASS", "");
// //Имя базыданных
// define("DB", "reactapp");
// //Базовый URL
// define("PATH", "http://react-api/");


//Production connect data


//Имя хоста
define("DBHOST", "localhost");
//Логин генерируется при создании базы данных допустимо 7 символов / darcos1
define("DBUSER", "u1048356_darcos1");
//Пароль генерируется при создании базы данных / 412276889Aa
define("DBPASS", "412276889Aa");
//Имя базыданных
define("DB", "u1048356_reactapp");
//Базовый URL
define("PATH", "http://react-api/");




try{
  $connection = new PDO('mysql:host='.DBHOST.';dbname='.DB,DBUSER,DBPASS);
  $connection->exec("SET NAMES UTF8");
}catch(PDOException $e){
  echo "Не удалось подключиться к базе данных ".$e->getMessage();
}



?>
