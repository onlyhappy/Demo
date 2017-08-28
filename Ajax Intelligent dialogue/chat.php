<?php
	$messages = array(
		'你说啥？',
		'你也好',
		'你找我有啥事？',
		'我在吃饭！',
		'你吃饭吗？'
	);

	// 通过array_rand()随机获取数组下标

	echo $messages[array_rand($messages)];

	sleep(1);
?>