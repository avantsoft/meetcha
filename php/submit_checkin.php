<?php
session_start();
require_once ("OAuth.php");
require_once ("config.php");

$fields_string_arr['event_id'] = $_REQUEST['event_id'];

//Join Group URL
$meetup_url = 'https://api.meetup.com/2/checkin';
$signature = new OAuthSignatureMethod_HMAC_SHA1();
$consumer = new OAuthConsumer($key, $secret, NULL);
$token = new OAuthConsumer($oauth_token_per, $oauth_token_secret_per, 1);
$request = OAuthRequest::from_consumer_and_token($consumer, $token, "POST", $meetup_url);
$request->sign_request($signature, $consumer, $token);
$header = $request->to_header();

error_log('submit_checkin_URL:' . $meetup_url . " event_id:" . $fields_string_arr['event_id'] . " , rsvp:" . $fields_string_arr['rsvp'] . " , member_id:" . $member_id);
$meetup_response = _http_request($meetup_url, $header, $fields_string_arr, 'POST');

jsonEcho($meetup_response);