document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    var save = document.getElementById("ctc_save");
    save.addEventListener('click', function() {
      var extn = document.getElementById("ctc_extn").value;
      var url = document.getElementById("ctc_url").value;
      chrome.storage.sync.set({'ctc_extn': extn,'ctc_url':url}, function() {
      });
      window.close();
      location.reload();
    }, false);

    chrome.storage.sync.get(['ctc_extn','ctc_url'], function (obj) {
      var extn = document.getElementById("ctc_extn");
      var url = document.getElementById("ctc_url");
      if(obj['ctc_extn'] == undefined){
        extn.value = "";
      }else{
        extn.value = obj['ctc_extn'];
      }
      if(obj['ctc_url'] == undefined){
        url.value =  "";
      }else{
        url.value =  obj['ctc_url'];
      }
      
     });
  }, false);

 