<?php
require_once(__DIR__ . "/../classes/week.php");

$week = Week::fromRaw(1, "[1, 2, 3, 4]", 122026);
var_dump($week);
$ret = $week->save();
echo "<br/>";
var_dump($ret);
?>