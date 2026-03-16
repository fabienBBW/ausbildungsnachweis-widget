<html>
    <head>
        <title>
            PHP DB Admin Page
        </title>
        <link rel="stylesheet" href="admin-style.css">
    </head>
    <body>
        <h1>PHP ADMIN MySQL SEED DBs with necessary tables</h1>
        <ul>
            <li>
                ?create_table=days -> Create table days (holds activity information for a day).
            </li>
        </ul>
<?php 

// config.php executes the SQL connect statement to generate the PDO object.
require_once("./config.php");

// createTableDay: create the table 
// which will hold the activity information for a day.
// |day_id|day_date|day_activities_json
// day_activities_json: [["Tipp 10 (Lektion 10)", 0.5], ["IT-News", 1.0]]
function createTableDay($pdo) {
    try {
        $sql = "CREATE TABLE IF NOT EXISTS days (
            day_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            day_date BIGINT UNSIGNED NOT NULL,
            day_activities_json JSON NOT NULL
        );";
        $return_val = $pdo->exec($sql);
        if ($return_val === false) {
            echo "Error creating table.";
        }
        echo "Created table days. Return value: " . strval($return_val);
    } catch(PDOException $e) {
        echo "Error creating table: " . $sql . "<br>" . $e->getMessage();
    }
}

if(isset($_GET['create_table'])) {
    echo "<br /> create_table param = " . $_GET["create_table"] . "<br />";
    if($_GET['create_table'] == "days") {
        createTableDay($pdo);
    }
}
?>
    </body>
</html>