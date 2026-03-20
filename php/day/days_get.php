<?php
    header("Content-Type: application/json");
    
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        require("../config.php");
        require("../classes/day.php");
        $json_data = json_decode(file_get_contents("php://input"), true);
        if(array_key_exists("day_cw", $json_data)) {
            $days = Day::getDaysFromCW($json_data["day_cw"]);
            echo json_encode($days, JSON_PRETTY_PRINT);
        }
    }
?>