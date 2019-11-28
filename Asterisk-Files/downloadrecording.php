<?php
 $fn = $_GET['fn'];
 $yr = $_GET['yr'];
 $mn = $_GET['mn'];
 $dd = $_GET['dd'];
 $file = "/var/spool/asterisk/monitor/" . $yr . "/" . $mn . "/" . $dd . "/" . $fn;
 $noextn = substr($file, 0, -3);
 $mp3extn = $noextn . 'mp3';
 if (file_exists($file)) {
 
 if (!file_exists($mp3extn)) {	
	# $commandOutput = shell_exec('/usr/bin/ffmpeg -i ' . $file . ' ' . $mp3extn);
	$commandOutput = shell_exec('/usr/bin/lame -V 2 ' . $file . ' ' . $mp3extn);
 }
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="'.basename($mp3extn).'"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($mp3extn));
    readfile($mp3extn);
    exit;
} ?>


