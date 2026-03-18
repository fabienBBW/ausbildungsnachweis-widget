<?php
class Day {
    public int $day_id;
    public string $day_date;
    public string $day_activities_json;
    public int $day_cw;

    // construct new Day object based on given values.
    public static function fromRaw(int $day_id, string $day_date, string $day_activities_json, int $day_cw) {
        $day = new static();
        $day->day_id = $day_id;
        $day->day_date = $day_date;
        $day->day_activities_json = $day_activities_json;
        $day->day_cw = $day_cw;
        return $day;
    }

    // construct new Day object based on data from database.
    public static function fromId(int $day_id) {
        require("../config.php");
        $stmt = $pdo->prepare("SELECT * FROM days WHERE day_id = ?");
        $stmt->execute([$day_id]);
        $stmt->setFetchMode(PDO::FETCH_CLASS, self::class);
        $day = $stmt->fetch();
        return $day;
    }

    // save changes or new Day object to DB.
    public function save() {
        require("../config.php");
        $day_id = $this->day_id;
        if($this->fromId($day_id) == false) {
            // completely new day object.
            $stmt = $pdo->prepare("INSERT INTO days (day_id, day_date, day_activities_json, day_cw) VALUES(?, ?, ?, ?)");
            $ret_val = $stmt->execute([$this->day_id, $this->day_date, $this->day_activities_json, $this->day_cw]);
            if($ret_val == false) {
                return false;
            }
            return true;
        } else {
            $stmt = $pdo->prepare("UPDATE days SET day_date = ?, day_activities_json = ?, day_cw = ? WHERE day_id = ?");
            $ret_val = $stmt->execute([$this->day_date, $this->day_activities_json, $this->day_cw, $this->day_id]);
            if($ret_val == false) {
                return false;
            }
            return true;
        }
    }
}
?>