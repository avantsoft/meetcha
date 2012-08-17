<?php

session_start();
require_once ("OAuth.php");
require_once ("config.php");

if($_COOKIE['member_id'] && $_COOKIE['oauth_token'] && $_COOKIE['oauth_token_secret']){
    jsonEcho(json_encode(array('results' => array('id' => $_COOKIE['member_id']))));
}else{
    jsonEcho(json_encode(array('results' => array('id' => -1))));
}