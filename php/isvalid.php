<?php
session_start();
require_once ("OAuth.php");
require_once ("config.php");

$destination = $_SESSION['destination'];

$db_oauth_token_secret = $_SESSION['tmp_tokens']['oauth_token_secret'];

$url = "https://api.meetup.com/oauth/access/";


$consumer = new OAuthConsumer($key, $secret, NULL);
$token = new OAuthConsumer($_REQUEST['oauth_token'], $db_oauth_token_secret, 1);
$signature = new OAuthSignatureMethod_HMAC_SHA1();
$request = OAuthRequest::from_consumer_and_token($consumer, $token, "POST", $url);
$request->set_parameter("oauth_verifier", $_REQUEST['oauth_verifier']);
$request->sign_request($signature, $consumer, $token);
$header = $request->to_header("https://api.meetup.com");
$response = _http_request($url, $header, 'token_request');

parse_str($response,$tokens_per);


$oauth_token_per = $tokens_per['oauth_token'];
$oauth_token_secret_per = $tokens_per['oauth_token_secret'];
$member_id = $tokens_per['member_id'];

$_SESSION['active_tokens'] = $tokens_per;

$url_self = 'https://api.meetup.com/members.json/?relation=self';
$signature = new OAuthSignatureMethod_HMAC_SHA1();
$consumer = new OAuthConsumer($key, $secret, NULL);
$token = new OAuthConsumer($oauth_token_per, $oauth_token_secret_per, 1);
$request = OAuthRequest::from_consumer_and_token($consumer, $token, "GET", $url_self);
$request->sign_request($signature, $consumer, $token);
$header = $request->to_header("https://api.meetup.com");

$response = _http_request($url_self, $header);

$_SESSION['member_info'] = $response;

error_log('$tokens_per:' . $tokens_per);
error_log('reeesponse:' . $response);

$thirtydays = time()+60*60*24*30;
setcookie('oauth_token', $oauth_token_per, $thirtydays, '/');
setcookie('oauth_token_secret', $oauth_token_secret_per, $thirtydays, '/');
setcookie('member_id', $member_id, $thirtydays, '/');

// Meetcha
$destination_with_param = $destination;
Header("Location: {$destination_with_param}");

?>