<?php

session_start();
require_once ("OAuth.php");
require_once ("config.php");

if (!empty($_REQUEST) && is_array($_REQUEST)) {
    $fields_string_arr = array();
    foreach ($_REQUEST as $key => $value) {
        if (preg_match('/^answer\_/', $key)) {
            $fields_string_arr[$key] = $value;
        }
    }
        
    $fields_string_arr['group_id'] = $_REQUEST['group_id'];
    $fields_string_arr['group_urlname'] = $_REQUEST['group_urlname'];
    $fields_string_arr['intro'] = 'hello';

    //Join Group URL
    $url_join_group = 'https://api.meetup.com/2/profile';
    $signature = new OAuthSignatureMethod_HMAC_SHA1();
    $consumer = new OAuthConsumer($key, $secret, NULL);
    $token = new OAuthConsumer($oauth_token_per, $oauth_token_secret_per, 1);
    $request = OAuthRequest::from_consumer_and_token($consumer, $token, "POST", $url_join_group);
    $request->sign_request($signature, $consumer, $token);
    $header = $request->to_header();

	error_log('2_rsvps_URL:' . $meetup_url . ' , group_id:' .  $fields_string_arr['group_id'] . " , member_id:" . $member_id);
    $response_join = _http_request($url_join_group, $header, $fields_string_arr, 'POST');
    
	jsonEcho($response_join);
}

?>