# ausbildungsnachweis-widget
[![language](https://img.shields.io/badge/language-JS-blue?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![language](https://img.shields.io/badge/language-HTML-blue?logo=html5)](https://developer.mozilla.org/en-US/docs/Web/HTMLphp)
[![language](https://img.shields.io/badge/language-PHP-blue?logo=php)](https://www.php.net/)
[![language](https://img.shields.io/badge/language-CSS-blue?logo=css)](https://developer.mozilla.org/en-US/docs/Web/CSS)

![index.html page screenshot](https://i.ibb.co/DP8k9VdB/index-html.jpg)
![export PDF screenshot](https://i.ibb.co/S2PGV7S/template-ausbildungsnachweis.jpg)

## Table of Contents  
- [About](#-about)
- [Prerequisites](#-prerequisites)
- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)

## About  
This is a widget for filling out your "Ausbildungsnachweis" (apprenticeship proof of work by writing down completed tasks of the day).
You can fill out the tasks you have completed during the day with markdown support in a markdown editor and
then export them to PDF or in general view it all in a table.

## Prerequisites
To run this development version of the widget, you have to have XAMPP installed on Windows.

## Getting Started
1. Make sure you have XAMPP installed in c:/xampp.
2. Copy the source files over to your XAMPP home:
```shell
git clone https://github.com/fabienBBW/ausbildungsnachweis-widget.git
cd ausbildungsnachweis-widget/build
./copy.ps1
```
3. Start XAMPP Control Panel and start Apache and MySQL.
4. Create a new user in mysql "ausbildungsnachweis-widget" and give it the password "600degrees".
5. Create a new database called "ausbildungsnachweis".
6. Give the user "ausbildungsnachweis-widget" full privileges over the "ausbildungsnachweis" database.
7. Head over to [Seed DB](http://localhost/ausbildungsnachweis-widget/php/seed_db.php)
8. Create the weeks and days DB.
9. You are ready to use the widget! Go to the index page: [index.html](http://localhost/ausbildungsnachweis-widget/html/index.html).

TO-DO:  
(The current setup steps will be replaced by a script in the future).

## Directory Structure
- ./html: HTML source files.
- ./js: JS source files.
- ./php: PHP source files.
- ./css: CSS source files.
- ./html/index.html: Main entry point. Edit your "Ausbildungsnachweise" here.
- ./html/template-ausbildungsnachweis.html: Export your "Ausbildungsnachweis".
- ./js/index.js: Main JS file.  
- ./css/widget-style.css: CSS file for index.html.  
- ./css/print_style.css: CSS file for ausbildungsnachweis.html (export document).    