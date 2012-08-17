<?php
require_once('config.php');
session_start();
unset($_SESSION['member_info']);
unset($_SESSION['active_tokens']);

$expired = time() - 3600;
setcookie('oauth_token', '', $expired, '/');
setcookie('oauth_token_secret', '', $expired, '/');
setcookie('member_id', '', $expired, '/');

jsonEcho(json_encode(array('success' => true)));