<?php
#ip address that asterisk is on.
$strHost = "127.0.0.1";
$strUser = "admin";				#specify the asterisk manager username you want to login with
$strSecret = "p/YvnyafsXq/";		#specify the password for the above user
#specify the channel (extension) you want to receive the call requests with
#e.g. SIP/XXX, IAX2/XXXX, ZAP/XXXX, etc
# $strChannel = "SIP/100";
$strChannel = "PJSIP/" . $_REQUEST['exten'];
$strContext = "from-internal";
#specify the amount of time you want to try calling the specified channel before hangin up
$strWaitTime = "30";
#specify the priority you wish to place on making this call
$strPriority = "1";
#specify the maximum amount of retries
$strMaxRetry = "2";
$number=strtolower($_REQUEST['number']);
$pos=strpos ($number,"local");
if ($number == null) :
exit() ;
endif ;
if ($pos===false) :
$errno=0 ;
$errstr=0 ;
$strCallerId = "Web Call $number";
$oSocket = fsockopen ("localhost", 5038, $errno, $errstr, 20);

if (!$oSocket) {
echo "$errstr ($errno)<br>\n";
} else {
fputs($oSocket, "Action: login\r\n");
fputs($oSocket, "Events: off\r\n");
fputs($oSocket, "Username: $strUser\r\n");
fputs($oSocket, "Secret: $strSecret\r\n\r\n");
fputs($oSocket, "Action: originate\r\n");
fputs($oSocket, "Channel: $strChannel\r\n");
fputs($oSocket, "WaitTime: $strWaitTime\r\n");
fputs($oSocket, "CallerId: $strCallerId\r\n");
fputs($oSocket, "Exten: $number\r\n");
fputs($oSocket, "Context: $strContext\r\n");
fputs($oSocket, "Priority: $strPriority\r\n\r\n");
fputs($oSocket, "Action: Logoff\r\n\r\n");
sleep(2);
fclose($oSocket);
}
echo "Extension $strChannel should be calling $number." ;
else :
exit() ;
endif ;
?>
