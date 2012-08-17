<?
require_once ("OAuth.php");
require_once ('config.php');

$oauth_access_token_endpoint = 'https://api.meetup.com/oauth/access/';
$oauth_authorize_endpoint = "http://www.meetup.com/authenticate/?oauth_token=request_token_key";

$base_url = "http://localhost/oAuthtest2/"; //Replace with your app's URL

//We were passed these through the callback.
$token = $_REQUEST['token'];
$token_secret = $_REQUEST['token_secret'];

$consumer = new OAuthConsumer($key, $secret, NULL);
$auth_token = new OAuthConsumer($token, $token_secret);
$access_token_req = new OAuthRequest("GET", $oauth_access_token_endpoint);
$access_token_req = $access_token_req->from_consumer_and_token($test_consumer,
                $auth_token, "GET", $oauth_access_token_endpoint);

$access_token_req->sign_request(new OAuthSignatureMethod_HMAC_SHA1(),$consumer,
                $auth_token);

$after_access_request = doHttpRequest($access_token_req->to_url());
parse_str($after_access_request,$access_tokens);

$access_token = new OAuthConsumer($access_tokens['oauth_token'], $access_tokens['oauth_token_secret']);

$streamkey_req = $access_token_req->from_consumer_and_token($consumer,
                $access_token); 

$streamkey_req->sign_request(new OAuthSignatureMethod_HMAC_SHA1(),$consumer,$access_token);

$after_request = doHttpRequest($streamkey_req->to_url());

//Get streamkey from returned XML
$stream_key = parseStream_KeyFromXML ($after_request);

if ($stream_key == '')
    echo ("Error getting stream_key from API!");
else
{   //We got the key! Embed the broadcaster and we're done.
    echo "SUCCEEESSS";
}

//helper function to get the stream_key from returned XML
function parseStream_KeyFromXML($xml)
{
    $xml_parser = xml_parser_create();

    xml_parse_into_struct($xml_parser, $xml, $vals, $index);
    xml_parser_free($xml_parser);

    if ($vals[1]['tag'] == "STREAM_KEY")
        return $vals[1]['value'];
    else
        return '';
}?>