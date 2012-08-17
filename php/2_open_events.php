<?php
session_start();
require_once ("OAuth.php");
require_once ("config.php");

$interests = readGetParam('Interests', '');
$query = getStandardParams();
if($interests !== ''){
    $query .= '&text='.$interests;
}

$offset = readGetParam('page', 0) - 1;
$meetup_url = 'https://api.meetup.com/2/open_events?fields=self&member_id=self&page='.readGetParam('limit',20)."&offset=".$offset.$query;
$signature = new OAuthSignatureMethod_HMAC_SHA1();
$consumer = new OAuthConsumer($key, $secret, NULL);
$token = new OAuthConsumer($oauth_token_per, $oauth_token_secret_per, 1);
$request = OAuthRequest::from_consumer_and_token($consumer, $token, "GET", $meetup_url);
$request->sign_request($signature, $consumer, $token);
$header = $request->to_header("https://api.meetup.com");

error_log('2_open_events_URL:' . $meetup_url);
$meetup_response = _http_request($meetup_url, $header);

jsonEcho($meetup_response);