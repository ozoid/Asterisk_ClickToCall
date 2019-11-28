var nodelist = [];
console.log("Page Done");
window.onload = function() {
    chrome.storage.sync.get(['ctc_extn','ctc_url'], function (obj) {
        var extn = "";
        var url = "";
        console.log('ctc_extn:', obj['ctc_extn']);
        extn = obj['ctc_extn'];
        url =  obj['ctc_url'];
        var node = document.body;
        var all = textNodesUnder(node);
         for (var i=0, max=all.length; i < max; i++) {
                 noder(all[i]);
         }
        for (var n=0;n<nodelist.length;n++) {
            createEle(nodelist[n],extn,url);
        }
       });
};

function textNodesUnder(el){
    var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
    while(n=walk.nextNode()) a.push(n);
    return a;
}

function createEle(node,extn,url){
    if(node[1] == undefined){
        return;
    }
    var anchor = document.createElement('a');
    anchor.setAttribute('href', "http://"+url+"/clicktocall.php?exten="+extn+"&number="+node[1]);
    anchor.setAttribute('title', node[1]);
    anchor.setAttribute('target','_blank');
    anchor.style = 'font-weight:normal;';
    anchor.appendChild(document.createTextNode(node[1] ));
   // img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAIAAAD9MqGbAAAABnRSTlMAAAAAAABupgeRAAAACXBIWXMAAAsTAAALEwEAmpwYAAADHklEQVQ4jVWTzWtdVRTF19r7nHPvfe/lJTGliKAWwRpQUSxR5xVEqAP9B5yITqwjR3ZoxZnguKCjIB1pQQqiFB1o8bOW1kKLH2miltjUJi95yX3vnrO3A0PBNVlr8FuztYj/6+BsfezIwcN3N3f1w30Lzf0H6t1SrW1MfljZ+uCLlT9ubt8heSepyuvHHnnzxcW5gYTpLf9ntUxymUjJkYMZnZtttXpj+eqpT6/t8//ZXD8tv/rYS49KnG6WLherTWfcm+KVlWCbI4lWN3x+aWHC+qsrN/ebgyadfuXhpblt2xtbV9htMY8JaF2H4TAt9MP8IN8aMVAqOfr4gavr5eeV20ry1MtLTw5HPhl5KZ47z9NuZ4zcCosGYUzSq0SlbI1ZVRL96NKh9z+7rs8dOXT8ibqMNqxt0U1pGWYUeM5koYhIkWYodSy3RxBljP1emKDW4888eDhtl70xc0GXFS4SVClRCWqAqEozh1hR3NsJU2TUZjCUxYXK2hYGFhMz5oyuQzZ0WVQcDk2wDASdn5UUCLj5A/fMhqEUGAjCHQZkI4sHOrWMW43RS0Y3RcggpakgQrcmUQCC4kbLYlksu7ujAAbPxbvseeIESgczxkQBzCaZsp3hGhAqpIpCUAkhhS6iydtsbWvjEaY76DqYoxgMKze25dvVETWCYOqx7jHVboJCQmDCUKPQ2x2b7pkVkPACDeev3JAzl9aZetToZq61S+VauweUCFeAjmiu7nQzd8LEPH3y3d/y/W8bFzcKtALogEkyrZzBKWT0KdyDZ7dpZ1Av7qIrm+Hcj9fF3U+c/XWMyKpBiAwKwiGuwYVIFUBogkY4XZKl4YkPL01zVgA3dyYX1ifPPjRfRxERihCgKigU1SDSNKxrTwN3vPv5X+99/NP+4gn8udV+vbb39L392UR4oSqD0J0SZNCXqvZ6ZnNP3zpz7e3TF/b/SYKAEEFwoB9fe+rgC4sz/SihUg1B6zr06lz33zn7+/KXv9zamRSHORxQIQioIAjpdnl955u1bQOaVGvqbWU5v7p78qPL5y6u7U6LOR1wB4B/AUMWmsMnASsAAAAAAElFTkSuQmCC";
    if(node[0].parentElement){
        var pele = node[0].parentElement;
        var curr = node[0].textContent;
        if(pele.tagName == "TEXTAREA"){
            pele.parentElement.insertBefore(anchor, pele);
        }else{
            if(node[0].nextSibling){
                pele.insertBefore(anchor, node[0].nextSibling);
            }else{
                pele.appendChild(anchor);
            }
        }
    }
    node[0].remove();
}

function isVisible(e) {
    e = e.parentElement;
    return !!( e.offsetWidth || e.offsetHeight || e.getClientRects().length );
}

function noder(node){
    if(node.textContent != undefined){
        var regex = /(\+?\d{3,5}\s?\d{3,}\s?\d{3,5})/g
        var found = node.textContent.match(regex);
        if(found != undefined){
            if(found.length >0 && isVisible(node)){
                for(var i = 0;i<found.length;i++){
                    nodelist.push([node,found[i]]);
                    console.log("N:" + found[i]);
                }
            }
        }
    }
}