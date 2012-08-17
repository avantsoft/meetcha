<?php
session_start();
require_once ("OAuth.php");
require_once ("config.php");

$fields_string_arr['event_id'] = $_REQUEST['event_id'];
$fields_string_arr['comment'] = $_REQUEST['comment'];

//Join Group URL
$meetup_url = 'https://api.meetup.com/2/event_comment';
$signature = new OAuthSignatureMethod_HMAC_SHA1();
$consumer = new OAuthConsumer($key, $secret, NULL);
$token = new OAuthConsumer($oauth_token_per, $oauth_token_secret_per, 1);
$request = OAuthRequest::from_consumer_and_token($consumer, $token, "POST", $meetup_url);
$request->sign_request($signature, $consumer, $token);
$header = $request->to_header();

error_log('2_event_comment_URL:' . $meetup_url . " event_id:" . $fields_string_arr['event_id'] . " , comment:" . $fields_string_arr['comment']);
$meetup_response = _http_request($meetup_url, $header, $fields_string_arr, 'POST');

jsonEcho($meetup_response);

?>