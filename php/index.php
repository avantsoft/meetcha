<?php
session_start();
require_once ("OAuth.php");
require_once ("config.php");

$meetcha_home_destination = 'http://localhost/meetcha/';  // <<URL pointing to Meetcha App Home>> can be '../' if php is under meetcha app dir 
$_SESSION['destination'] = $_REQUEST['destination'] ? $_REQUEST['destination'] : $meetcha_home_destination;

$scriptName = str_replace('index.php', '' , $_SERVER['SCRIPT_NAME']);
$app_home_url = 'http://'.$_SERVER['HTTP_HOST'] . $scriptName;

// Meetcha
$base_url = $php_home_url; // "http://localhost/oAuthtest2/";
$request_token_endpoint = 'https://api.meetup.com/oauth/request/';
$authorize_endpoint = 'http://www.meetup.com/authorize/?oauth_token=request_token_key';

$test_consumer = new OAuthConsumer($key, $secret, NULL);

//prepare to get request token

$sig_method = new OAuthSignatureMethod_HMAC_SHA1();
$parsed = parse_url($request_token_endpoint);
$params = array(callback => $base_url);
parse_str($parsed['query'], $params);

$req_req = OAuthRequest::from_consumer_and_token($test_consumer, NULL, "GET", $request_token_endpoint, $params);
// Meetcha
$req_req->set_parameter("oauth_callback", $app_home_url . 'isvalid.php'); // 'http://localhost/oAuthtest2/isvalid.php');
$req_req->sign_request($sig_method, $test_consumer, NULL);

$req_token = doHttpRequest ($req_req->to_url());

//assuming the req token fetch was a success, we should have
//oauth_token and oauth_token_secret

parse_str($req_token,$tokens);

$oauth_token = $tokens['oauth_token'];
$oauth_token_secret = $tokens['oauth_token_secret'];

$_SESSION['tmp_tokens'] = $tokens;

$auth_url = "http://www.meetup.com/authorize/?oauth_token=".$oauth_token;

//Forward us to meetup for auth
Header("Location: $auth_url");