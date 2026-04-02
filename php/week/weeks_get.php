<?php
    header("Content-Type: application/json");

    if($_SERVER["REQUEST_METHOD"] == "POST") {
        require(__DIR__ . "/../config.php");
        require(__DIR__ . "/../classes/day.php");
        
    }
?>