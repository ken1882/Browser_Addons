// ==UserScript==
// @name         Joyme Wiki Remover
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove annoying stuff on wiki page
// @author       Compeador
// @encoding     utf-8
// @license      https://creativecommons.org/licenses/by-sa/4.0/
// @match        http://wiki.joyme.com/*
// @homepage     https://github.com/ken1882/Browser_Addons/tree/master/Joyme%20Wiki%20Remover
// @updateURL    https://raw.githubusercontent.com/ken1882/Browser_Addons/master/Joyme%20Wiki%20Remover/Joyme%20Wiki%20Remover.js
// @run-at       document-start
// @grant        none
// ==/UserScript==

function removeElement(ele){
  ele.parentNode.removeChild(ele);
}

(function() {
  'use strict';

  let removeTargetClass = ["bl-r-adv", "share-right"];
  let flagRemoved = {};
  let updateTime = 300;
  let timeoutDuration = 10000;
  let timeoutTimer = 0

  let elementKiller = function(name){
    timeoutTimer += updateTime;
    if(flagRemoved[name] || timeoutTimer > timeoutDuration){return ;}
    console.log("Listening " + name + ' ' + document.getElementsByClassName(name)[0])
    try{
      removeElement(document.getElementsByClassName(name)[0]);
      flagRemoved[name] = true;
    }
    catch(e){
      setTimeout(()=>{elementKiller(name)}, updateTime);
    }
  }

  for(let i in removeTargetClass){
    let name = removeTargetClass[i];
    flagRemoved[name] = false;
    setTimeout(()=>{elementKiller(name)}, updateTime);
  }
})();