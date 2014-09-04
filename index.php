<!doctype html>
<html>
	<head>
		<title>College Editor - v0.5</title>
		<meta charset="utf-8" />
		<link rel="stylesheet" href="assets/css/editor.css?hash=<?php echo hash_file('md5', 'assets/css/editor.css'); ?>" />
		<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0" />
		<link rel="apple-touch-icon" href="assets/img/icon.png" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		<link rel="apple-touch-startup-image" href="assets/img/splashscreen.jpg" />
		<link rel="icon" type="image/png" href="assets/img/favicon.png" /> 
	</head>
	
	<body>
		<nav id="menu">
			<ul id="courses_list">
				<li><input placeholder="Nouveau..." id="add_input" /> <span id="add_btn">+</span></li>
<?php
$dir = opendir('courses/Markdown');
while ($entry = readdir($dir)) {
	if ($entry != '.' && $entry != '..') {
		$entry = str_replace('.md', '', $entry);
		echo '<li id="course_'.$entry.'" onclick="getCourse(\''.$entry.'\')">'.$entry.'</li>';
	}
}
closedir($dir);
?>
			</ul>
		</nav>
		
		<section>
			<header>
				<span id="menu_btn" title="Menu"><img src="assets/img/menu.png" alt="Menu" /></span>
				<span title="Save & Compile"><img id="save_btn" src="assets/img/save.png" alt="Save" /></span>
				<img src="assets/img/logo.png" height="40px" />
			</header>
			
			<div id="editor" class="block">
				<textarea id="editor_text" placeholder="Type your course in Markdown here..."></textarea>
			</div>
			<div id="result" class="block">... And see the result here !</div>
		</section>
		
		<script src="assets/js/marked.min.js"></script>
		<script src="assets/js/Behave.js"></script>
		<script src="assets/js/Ajax.js"></script>
		<script src="assets/js/Editor.js?hash=<?php echo hash_file('md5', 'assets/js/Editor.js'); ?>"></script>
	</body>
</html>