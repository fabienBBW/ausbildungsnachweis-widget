<?php
    header("Content-Type: application/json");

    if($_SERVER["REQUEST_METHOD"] == "POST") {
        require(__DIR__ . "/../config.php");
        require(__DIR__ . "/../classes/week.php");
        $json_data = json_decode(file_get_contents("php://input"), true);
        $weeks = Week::fromAllWeeks();
        echo json_encode($weeks, JSON_PRETTY_PRINT);
    }
?>