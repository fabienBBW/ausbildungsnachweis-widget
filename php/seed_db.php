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
                seed_db.php?create_table=days -> Create table days (holds activity information for a day).
            </li>
            <li>
                seed_db.php?create_table=weeks -> Create table weeks.
            </li>
        </ul>
<?php 

// config.php executes the SQL connect statement to generate the PDO object.
require_once("./config.php");

// createTableDay: create the table 
// which will hold the activity information for a day.
// |day_id|day_date|day_activities_json|day_cw
// day_activities_json: [["Tipp 10 (Lektion 10)", 0.5], ["IT-News", 1.0]]
// day_cw: calendar week the day is in
function createTableDay($pdo) {
    try {
        $sql = "CREATE TABLE IF NOT EXISTS days (
            day_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            day_date BIGINT UNSIGNED NOT NULL,
            day_activities_json JSON NOT NULL,
            day_cw INT UNSIGNED NOT NULL
        );";
        $return_val = $pdo->exec($sql);
        if ($return_val === false) {
            echo "Error creating table.";
        }
        echo "<br />Created table days. Return value: " . strval($return_val);
    } catch(PDOException $e) {
        echo "Error creating table: " . $sql . "<br>" . $e->getMessage();
    }
}

// createTableWeek: create the table
// which will hold the days.
// |week_id|days_ids_json|week_cw
// days_ids_json: [5, 6, 7]
// week_cw: calendar week.
function createTableWeek($pdo) {
    try {
        $sql = "CREATE TABLE IF NOT EXISTS weeks (
            week_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            days_ids_json JSON,
            week_cw INT UNSIGNED NOT NULL
        );";
        $return_val = $pdo->exec($sql);
        if ($return_val === false) {
            echo "Error creating table.";
        }
        echo "<br />Created table weeks. Return value: " . strval($return_val);
    } catch(PDOException $e) {
        echo "Error creating table: " . $sql . "<br>" . $e->getMessage();
    }
}

function seedDaysTable(DateTimeImmutable $start_date) {
    require("./classes/day.php");
    for($i = 0; $i <= 4; $i++) {
        $current_date = $start_date->add(new DateInterval("P${i}D"));
        $current_date_timestamp = $current_date->getTimestamp();
        $cw = 122026;
        $day = Day::fromRaw(null, $current_date_timestamp, "[\"{$current_date->format('Y-m-d')}\"]", $cw);
        $day->save();
        echo "Saved day {$current_date->format('Y-m-d')}";
    }
}

if(isset($_GET['create_table'])) {
    echo "<br /> create_table param = " . $_GET["create_table"] . "<br />";
    if($_GET['create_table'] == "days") {
        createTableDay($pdo);
    }
    if($_GET["create_table"] == "weeks") {
        createTableWeek($pdo);
    }
    if($_GET["create_table"] == "seed-days") {
        seedDaysTable(DateTimeImmutable::createFromFormat("Y-m-d", "2026-03-16"));
    }
}
?>
    </body>
</html>