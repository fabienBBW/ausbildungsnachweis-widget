<?php
class Day {
    public null|int $day_id;
    public string $day_date;
    public string $day_activities_json;
    public int $day_cw;
    public int $day_timestamp;

    // construct new Day object based on given values.
    public static function fromRaw(null|int $day_id, string $day_date, string $day_activities_json, int $day_cw, int $day_timestamp) {
        $day = new static();
        $day->day_id = $day_id;
        $day->day_date = $day_date;
        $day->day_activities_json = $day_activities_json;
        $day->day_cw = $day_cw;
        $day->day_timestamp = $day_timestamp;
        return $day;
    }

    // construct new Day object based on data from database.
    public static function fromId(int $day_id) {
        require(__DIR__ . "/../config.php");
        $stmt = $pdo->prepare("SELECT * FROM days WHERE day_id = ?");
        $stmt->execute([$day_id]);
        $stmt->setFetchMode(PDO::FETCH_CLASS, self::class);
        $day = $stmt->fetch();
        return $day;
    }

    // construct new day based on given date (data from database).
    public static function fromDate(string $day_date) {
        require(__DIR__ . "/../config.php");
        $stmt = $pdo->prepare("SELECT * FROM days WHERE day_date = ?");
        $stmt->execute([$day_date]);
        $stmt->setFetchMode(PDO::FETCH_CLASS, self::class);
        $day = $stmt->fetch();
        return $day;
    }

    public static function getDaysFromCW(int $day_cw) {
        require(__DIR__ . "/../config.php");
        $stmt = $pdo->prepare("SELECT * FROM days WHERE day_cw = ? ORDER BY day_timestamp ASC");
        $stmt->execute([$day_cw]);
        $days = $stmt->fetchAll(PDO::FETCH_CLASS, self::class);
        return $days;
    }

    // save changes or new Day object to DB.
    public function save() {
        require(__DIR__ . "/../config.php");
        $day_id = $this->day_id;
        if($day_id == null || $this->fromId($day_id) == false) {
            // completely new day object.
            $stmt = $pdo->prepare("INSERT INTO days (day_date, day_activities_json, day_cw, day_timestamp) VALUES(?, ?, ?, ?)");
            $ret_val = $stmt->execute([$this->day_date, $this->day_activities_json, $this->day_cw, $this->day_timestamp]);
            if($ret_val == false) {
                return false;
            }
            return $pdo->lastInsertId();
        } else {
            $stmt = $pdo->prepare("UPDATE days SET day_date = ?, day_activities_json = ?, day_cw = ?, day_timestamp = ? WHERE day_id = ?");
            $ret_val = $stmt->execute([$this->day_date, $this->day_activities_json, $this->day_cw, $this->day_timestamp, $this->day_id]);
            if($ret_val == false) {
                return false;
            }
            return true;
        }
    }
}
?>