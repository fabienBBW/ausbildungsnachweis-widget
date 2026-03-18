<?php
class Week {
    public int $week_id;
    public string $days_ids_json;
    public int $week_cw;
    public $daysArray;

    public static function fromRaw(int $week_id, string $days_ids_json, int $week_cw) {
        $week = new static();
        $week->week_id = $week_id;
        $week->days_ids_json = $days_ids_json;
        $week->week_cw = $week_cw;
        return $week;
    }

    public static function fromCW(int $week_cw) {
        require("../config.php");
        $stmt = $pdo->prepare("SELECT * FROM weeks WHERE week_cw = ?");
        $stmt->execute([$week_cw]);
        $stmt->setFetchMode(PDO::FETCH_CLASS, self::class);
        $week = $stmt->fetch();
        return $week;
    }

    public function save() {
        require("../config.php");
        $week_cw = $this->week_cw;
        if($this->fromCW($week_cw) == false) {
            // completely new week object.
            $stmt = $pdo->prepare("INSERT INTO weeks (week_id, days_ids_json, week_cw) VALUES (?, ?, ?)");
            $ret_val = $stmt->execute([$this->week_id, $this->days_ids_json, $this->week_cw]);
            if($ret_val == false) {
                return false;
            }
            return true;
        } else {
            $stmt = $pdo->prepare("UPDATE weeks SET days_ids_json = ?, week_cw = ? WHERE week_id = ?");
            $ret_val = $stmt->execute([$this->days_ids_json, $this->week_cw, $this->week_id]);
            if($ret_val == false) {
                return false;
            }
            return true;
        }
    }
}
?>
