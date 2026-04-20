Get-Content "db_init.sql" | & "c:/xampp/mysql/bin/mysql.exe" -u root
echo "Created user ausbildungsnachweis-widget. Created tables days and weeks."