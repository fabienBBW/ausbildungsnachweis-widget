<?php
    require_once("../classes/day.php");
    $day = Day::fromId(112);
    var_dump($day);

    $day2 = Day::fromRaw(3, "999", '["def"]', 122026);
    var_dump($day2);
    $ret = $day2->save();
    var_dump($ret);
?>