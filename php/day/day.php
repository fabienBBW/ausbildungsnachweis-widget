<?php
    header("Content-Type: application/json");

    if($_SERVER["REQUEST_METHOD"] === "POST") {
        require("../config.php");
        $json_data = json_decode(file_get_contents("php://input"), true);
        
    }
?>