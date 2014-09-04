<?php
require_once 'Parsedown.php';
function parseMD($text) {
	$md = new Parsedown();
	return $md->text($text);
}