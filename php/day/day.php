<?php
    header("Content-Type: application/json");
    require(__DIR__ . "/../classes/day.php");

    // Create or update day.
    if($_SERVER["REQUEST_METHOD"] === "POST") {
        require(__DIR__ . "/../config.php");
        $json_data = json_decode(file_get_contents("php://input"), true);
        if(array_key_exists("day_id", $json_data)) {
            $day = Day::fromRaw($json_data["day_id"], $json_data["day_date"], $json_data["day_activities_json"], $json_data["day_cw"]);
        } else {
            $day = Day::fromRaw(null, $json_data["day_date"], $json_data["day_activities_json"], $json_data["day_cw"]);
        }
        
        $ret = $day->save();
        echo json_encode($ret);
    }
?>