Files to put on the Asterisk/FreePBX Server
within: /var/www/html/

* clicktocall.php - handler for dialling the extension and connecting
- updated version from Source: https://striker24x7.blogspot.com/2012/08/click-to-dial-or-php-api-to-dial-from.html
- fixed for PHP > 5.5
- Added PJSIP/ for extension

* downloadrecording.php - handler to get call recordings and convert to mp3
- uses lame mp3 encoder for wav-mp3 conversion
- resulting files can be played in browser
