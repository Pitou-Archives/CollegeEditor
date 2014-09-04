<ul>
<?php
$dir = opendir('Markdown');
while ($entry = readdir($dir)) {
	if ($entry != '.' && $entry != '..') {
		$entry = str_replace('.md', '', $entry);
		echo '<li style="border-bottom: 1px dotted black;"><a target="_blank" href="HTML/'.$entry.'.html">'.$entry.'</a> <span style="float:right">[<a href="Markdown/'.$entry.'.md">Markdown</a>]</span></li>';
	}
}
closedir($dir);
?>
</ul>