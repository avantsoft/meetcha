<?php

error_reporting(E_ERROR);
$key = 'sji8jk2vp8961s1lihy87yhd98'; //Bogus value - replace with '<your app's API key>';
$secret = 'fhni9hf5iv79t63ij89732498dh982'; //Bogus value - replace with '<your app's secret>';
$oauth_token_per = $_COOKIE['oauth_token'];
$oauth_token_secret_per = $_COOKIE['oauth_token_secret'];
$member_id = $_COOKIE['member_id'];

function jsonEcho($json) {
    $cb = $_REQUEST['callback'];
    if ($cb) {
        header('Content-Type: application/javascript');
        echo $cb . '(' . $json . ');';
    } else {
        header('Content-Type: application/json');
        echo $json;
    }
}

function doHttpRequest($urlreq) {
    $ch = curl_init();

    // set URL and other appropriate options
    curl_setopt($ch, CURLOPT_URL, $urlreq);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    // grab URL and pass it to the browser
    $request_result = curl_exec($ch);

    // close cURL resource, and free up system resources
    curl_close($ch);

    return $request_result;
}

function _http_request($url, $header, $body = NULL, $method = 'GET') {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_COOKIESESSION, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array($header));
    curl_setopt($ch, CURLOPT_URL, $url);

    if ($body) {
        curl_setopt($ch, CURLOPT_POST, 1);
        if ($body == 'token_request') {
            curl_setopt($ch, CURLOPT_POSTFIELDS, '');
        } elseif ($method == 'POST') {
            curl_setopt($ch, CURLOPT_POSTFIELDS,$body);
        }
    }

    if($method == "DELETE"){
         curl_setopt($ch, CURLOPT_DELETE, 1);
    }

    $output = curl_exec($ch);
    curl_close($ch);

    return $output;
}


function readGetParam($param, $default){
    return isset($_GET[$param]) && $_GET[$param] !== '' ? $_GET[$param] : $default;
}

function readBaseMeetupParams(){
    $params = array(
        'distance' => readGetParam('Distance', 25),
        'zip' => readGetParam('ZipCode', ''),
        'time' => readGetParam('Time', 5),
        'useLocation' => readGetParam('Location', false),
        'lat' => readGetParam('lat', false),
        'lon' => readGetParam('lon', false)
    );

    return $params;
}

function getStandardParams(){
    $params = readBaseMeetupParams();
    $standardQuery = '&radius='.$params['distance'];
    $shouldUseLocation = $params['useLocation'] == true && $params['lat'] !== false && $params['lon'] !== false;
    if($params['zip'] !== '' && !$shouldUseLocation){
        $standardQuery .= '&zip='.$params['zip'];
    }else if($shouldUseLocation){
        $standardQuery .= '&lat='.$params['lat'].'&lon='.$params['lon'];
    }
    return $standardQuery;
}