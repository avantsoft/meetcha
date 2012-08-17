<?php
session_start();
require_once ("OAuth.php");
require_once ("config.php");

$time = readGetParam('time', null);

$offset = readGetParam('page', 0) - 1;
$meetup_url = 'https://api.meetup.com/2/events?fields=self&member_id='.$member_id.'&page='.readGetParam('limit', 20).'&offset='.$offset;
if($time != null){
    $meetup_url .= '&time='.urlencode($time);
}
$signature = new OAuthSignatureMethod_HMAC_SHA1();
$consumer = new OAuthConsumer($key, $secret, NULL);
$token = new OAuthConsumer($oauth_token_per, $oauth_token_secret_per, 1);
$request = OAuthRequest::from_consumer_and_token($consumer, $token, "GET", $meetup_url);
$request->sign_request($signature, $consumer, $token);
$header = $request->to_header("https://api.meetup.com");

error_log('2_events_URL:' . $meetup_url);
$meetup_response = _http_request($meetup_url, $header);

jsonEcho($meetup_response);