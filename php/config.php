<?php
    // database access information (MariaDB).
    // TO-DO: load access data from JSON.
    $servername = "localhost";
    $username = "ausbildungsnachweis-widget";
    $password = "600degrees";
    $dbname = "ausbildungsnachweis";

    // PHP MYSQL data source name (DSN)
    $dsn = "mysql:host=$servername;dbname=$dbname;charset=utf8mb4";
    // Real prepared statements, error handling and associative arrays.
    // (https://mariadb.com/resources/blog/developer-quickstart-php-data-objects-and-mariadb/)
    $options = [
        PDO::ATTR_EMULATE_PREPARES  => false,
        PDO::ATTR_ERRMODE           => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ];

    try {
        $pdo = new PDO($dsn, $username, $password, $options);
    } catch(Exception $e) {
        error_log($e->getMessage());
        exit("Something bad happened");
    }
?>