// ==UserScript==
// @name         Fanza header remover
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove unnecessary stuffs
// @author       Compeador
// @match        https://pc-play.games.dmm.co.jp/play/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  document.querySelector("div .adult").remove();
})();