// ==UserScript==
// @name         Johren MTGs fullscreen
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds full-screen like unility to TW version of Mist Train Girls
// @author       Compeador
// @match        https://www.johren.net/games/misttraingirls-zh-tw/play/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  var screen_size = [1136, 640, 0, -15];
  var header = document.getElementById("header");
  var footer = document.querySelector(".footerMainContent");
  var container = document.querySelector(".application-game-play-frame");
  var gframe = document.getElementById('game_frame');
  var border_top = document.querySelector(".application-game-play");
  var border_bot = document.querySelector(".application-game-play-layout");
  var ori_tmargin, ori_bmargin;

  let enter_fullscreen = function(){
    window.scrollTo(0,0);
    ori_tmargin = border_top.style.margin;
    ori_bmargin = border_bot.style.margin;
    border_top.style.margin = 'auto';
    border_bot.style.margin = 'auto';
    header.style.display = 'none';
    footer.style.display = 'none';
    container.style.width = `${window.innerWidth}px`;
    container.style.height = `${window.innerHeight}px`;
    container.style.backgroundColor = 'rgb(215,210,189)';
    var scale = Math.min(container.clientWidth / screen_size[0], container.clientHeight / screen_size[1]);
    gframe.style.position = 'relative';
    gframe.style.WebkitTransform = `scale(${scale})`;
    var py = -gframe.getBoundingClientRect().y;
    py = py + screen_size[3];
    gframe.style.top = `${py}px`;
    container.requestFullscreen();
    setTimeout(() => {
      var dy = -gframe.getBoundingClientRect().y;
      var oy = (window.innerHeight - screen_size[1]*scale) / 4;
      gframe.style.top = `${py+dy+oy}px`;
    }, 500);
  }

  let exit_fullscreen = function(){
    border_top.margin = ori_tmargin;
    border_bot.margin = ori_bmargin;
    header.style.display = '';
    footer.style.display = '';
    container.style.width = '';
    container.style.height = '';
    container.style.backgroundColor = '';
    gframe.style.position = '';
    gframe.style.WebkitTransform = '';
    gframe.style.top = '';
  }

  let on_window_resize = function(_){
    if(document.mozFullScreen || document.webkitIsFullScreen){
      // return enter_fullscreen();
    }
    else{
      return exit_fullscreen();
    }
  }

  let initialize = function(){
    var btn = document.createElement("BUTTON");
    btn.innerText = "全螢幕";
    btn.onclick = enter_fullscreen;
    btn.style.margin = '4px 4px 4px 4px';
    document.querySelector(".application-game-play").prepend(btn);
    window.addEventListener("resize", on_window_resize);
  }
  window.addEventListener("load", initialize);
})();