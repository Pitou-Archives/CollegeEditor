<?php
require_once 'MdCompile.php';
define ('ACTION', $_POST['_action']);
switch (ACTION) {
	case 'get':
		echo json_encode(
			array (
				'markdown' => file_get_contents('../courses/Markdown/'.$_POST['name'].'.md'),
				'html' => file_get_contents('../courses/HTML/'.$_POST['name'].'.html')
			)
		);
		break;
	
	case 'create':
		$compiled = parseMD($_POST['content']);
		file_put_contents('../courses/Markdown/'.$_POST['name'].'.md', $_POST['content']);
		file_put_contents('../courses/HTML/'.$_POST['name'].'.html', '<!doctype html><html><head><title>'.$_POST['name'].' - CollegeEditor</title><meta charset="utf-8" /></head><body style="font-family:helvetica,verdana;text-align:justify;">'.$compiled.'</body></html>');
		echo json_encode(
			array (
				'compiled' => $compiled
			)
		);
		break;
	
	case 'delete':
		unlink('../courses/Markdown/'.$_POST['name'].'.md');
		unlink('../courses/HTML/'.$_POST['name'].'.html');
		break;
	
	default:
		header('HTTP/1.1 403 Forbidden');
		exit();
		break;
}
?>