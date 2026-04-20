CREATE DATABASE ausbildungsnachweis;
CREATE USER 'ausbildungsnachweis-widget'@'localhost' IDENTIFIED BY '600degrees';
GRANT ALL PRIVILEGES ON ausbildungsnachweis.* TO 'ausbildungsnachweis-widget'@'localhost';
FLUSH PRIVILEGES;
CREATE TABLE IF NOT EXISTS days (
            day_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            day_date TEXT NOT NULL,
            day_activities_json JSON NOT NULL,
            day_cw INT UNSIGNED NOT NULL,
            day_timestamp BIGINT UNSIGNED NOT NULL
        );
CREATE TABLE IF NOT EXISTS weeks (
            week_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            week_timestamp BIGINT UNSIGNED NOT NULL,
            week_cw INT UNSIGNED NOT NULL
        );