<?php
	$messages = array(
		'��˵ɶ��',
		'��Ҳ��',
		'��������ɶ�£�',
		'���ڳԷ���',
		'��Է���'
	);

	// ͨ��array_rand()�����ȡ�����±�

	echo $messages[array_rand($messages)];

	sleep(1);
?>