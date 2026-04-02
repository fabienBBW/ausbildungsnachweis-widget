<?php
class Week {
    public int $week_id;
    public string $week_timestamp;
    public int $week_cw;
    public $daysArray;

    public static function fromRaw(string $week_timestamp, int $week_cw) {
        $week = new static();
        $week->week_timestamp = $week_timestamp;
        $week->week_cw = $week_cw;
        return $week;
    }

    public static function fromCW(int $week_cw) {
        require(__DIR__ . "/../config.php");
        $stmt = $pdo->prepare("SELECT * FROM weeks WHERE week_cw = ?");
        $stmt->execute([$week_cw]);
        $stmt->setFetchMode(PDO::FETCH_CLASS, self::class);
        $week = $stmt->fetch();
        return $week;
    }

    public function save() {
        require(__DIR__ . "/../config.php");
        $week_cw = $this->week_cw;
        if($this->fromCW($week_cw) == false) {
            // completely new week object.
            $stmt = $pdo->prepare("INSERT INTO weeks (week_timestamp, week_cw) VALUES (?, ?)");
            $ret_val = $stmt->execute([$this->week_timestamp, $this->week_cw]);
            if($ret_val == false) {
                return false;
            }
            return true;
        } else {
            $stmt = $pdo->prepare("UPDATE weeks SET week_timestamp = ?, week_cw = ? WHERE week_cw = ?");
            $ret_val = $stmt->execute([$this->week_timestamp, $this->week_cw, $this->week_cw]);
            if($ret_val == false) {
                return false;
            }
            return true;
        }
    }
}
?>
