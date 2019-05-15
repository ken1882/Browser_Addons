// ==UserScript==
// @name         Joyme Wiki Remover
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove annoying stuff on wiki page
// @author       Compeador
// @encoding     utf-8
// @license      https://creativecommons.org/licenses/by-sa/4.0/
// @match        http://wiki.joyme.com/*
// @grant        none
// ==/UserScript==

function removeElement(ele){
  ele.parentNode.removeChild(ele);
}

// https://translate.google.com.tw/translate?hl=&sl=zh-CN&tl=zh-TW&u=
(function() {
  'use strict';

  let removeTargetClass = ["bl-r-adv", "share-right"];
  let flagRemoved = {};
  let updateTime = 300;

  let elementKiller = function(name){
    if(flagRemoved[name]){return ;}
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