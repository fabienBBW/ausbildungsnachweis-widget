<?php
    header("Content-Type: application/json");
    require(__DIR__ . "/../classes/day.php");
    require(__DIR__ . "/../classes/week.php");

    // Create or update day.
    if($_SERVER["REQUEST_METHOD"] === "POST") {
        require(__DIR__ . "/../config.php");

        // Save day.
        $json_data = json_decode(file_get_contents("php://input"), true);
        if(array_key_exists("day_id", $json_data)) {
            $day = Day::fromRaw($json_data["day_id"], $json_data["day_date"], $json_data["day_activities_json"], $json_data["day_cw"]);
        } else {
            $day = Day::fromRaw(null, $json_data["day_date"], $json_data["day_activities_json"], $json_data["day_cw"]);
        }
        
        $ret = $day->save();

        // Save corresponding week.
        $week = Week::fromRaw($json_data["week_timestamp"], $json_data["week_cw"]);
        $week_ret = $week->save();
        $ret_obj = array("day_ret"=>$ret, "week_ret"=>$week_ret);
        echo json_encode($ret_obj);
    }
?>