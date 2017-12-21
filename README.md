# CollegeEditor

## Description
Little tool for writing courses quickly. Created because I've too much to write in College with this old thing called pen *-*

## Details
You can add an HTTP Auth (via .htaccess/.htpasswd if you're using Apache) or any other feature (multi-users, folders, versions, creation/modification date, etc.) ! Don't be afraid to fork the project and to make your own awesome Editor !

HTML compiled files & Markdown source files are accessibles via /courses/index.php

## Warning
1. This soft need a internet connection to exchange with the server where it is installed (to open, delete and save courses). If you aren't connected, markdown compiling will still works thanks to a JavaScript fallback but a big text may slow down you browser and you will not be able to save changes. If you do not want to waste bandwidth, you can connect your device only when you want to synchronize changes with the server.
2. Web server user (www-data for example) need to have Write permissions on the folders **/courses/HTML** & **/courses/Markdown**

## Usage
Simply copy the full archive on your web server and start using it !

You can manually start the compiling by clicking on the "save" button on the top-right, else it will be started automatically every minute.
