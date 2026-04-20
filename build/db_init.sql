CREATE DATABASE IF NOT EXISTS ausbildungsnachweis;
CREATE USER IF NOT EXISTS 'ausbildungsnachweis-widget'@'localhost' IDENTIFIED BY '600degrees';
GRANT ALL PRIVILEGES ON ausbildungsnachweis.* TO 'ausbildungsnachweis-widget'@'localhost';
FLUSH PRIVILEGES;
CREATE TABLE IF NOT EXISTS ausbildungsnachweis.days (
            day_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            day_date TEXT NOT NULL,
            day_activities_json JSON NOT NULL,
            day_cw INT UNSIGNED NOT NULL,
            day_timestamp BIGINT UNSIGNED NOT NULL
        );
CREATE TABLE IF NOT EXISTS ausbildungsnachweis.weeks (
            week_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            week_timestamp BIGINT UNSIGNED NOT NULL,
            week_cw INT UNSIGNED NOT NULL
        );