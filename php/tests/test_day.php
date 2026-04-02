<?php
    require_once(__DIR__ . "/../classes/day.php");
    $day_date = "2026-04-02";
    $day_activities_json = <<<JSON
        ["abc"]
JSON;
    $day_cw = "142026";
    $week_timestamp = time();
    $week_cw = $day_cw;
    $json_content = array(
        "day_date"=>$day_date,
        "day_activities_json"=>$day_activities_json,
        "day_cw"=>$day_cw,
        "week_timestamp"=>$week_timestamp,
        "week_cw"=>$week_cw
    );
    $json_str = json_encode($json_content);

    $url = "http://localhost/ausbildungsnachweis-widget/php/day/day.php";

    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, 
        array("Content-Type: application/json"));
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $json_str);

    $json_response = curl_exec($curl);
    echo $json_response;
    $response = json_decode($json_response);
    echo var_dump($response);
?>