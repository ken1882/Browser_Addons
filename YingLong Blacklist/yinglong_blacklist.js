// ==UserScript==
// @name         YingLongDragonCaveBlackList
// @version      0.1
// @description  Hide the user comment that you hate
// @author       Compeador
// @match        https://yinglong.org/forum/*
// @grant        none
// ==/UserScript==

// Add the user name enclosed by double quotes,
// and followed by a comma to block the hater
let YLDC_BLACKLIST = [
  "Example User Name",
  // add here...
  "Dracostar3000",
]

let YLDC_HiddenCharacter = "█";
let YLDC_UPDATE_DURATION = 50; // ms
let YLDC_TransactionTable = [];

var script = document.createElement('script');

// the JQuery version the site is using
script.src = '//code.jquery.com/jquery-1.7.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

function toggle_spoiler(node){
  let flag_hidden = !!node.__yldc_hidden__;
  if(flag_hidden){
    let idx = node.__yldc_hide_idx__;
    node.innerText = YLDC_TransactionTable[idx];
    node.__yldc_hidden__ = '';
  }
  else{
    filter_comment(node);
    node.__yldc_hidden__ = '1';
  }
}

function add_spoiler_style(node){
  $(node).click((event) => {
    toggle_spoiler(event.target);
  });
  $(node).css("cursor", "pointer");
}

function register_comment(node){
  node.__yldc_hide_idx__ = YLDC_TransactionTable.length;
  node.__yldc_hidden__ = '1';
  YLDC_TransactionTable.push(node.innerText);
}

function filter_comment(node){
  let tmp = "", len = node.innerText.length;
  for(let i=0;i<len;++i){
    tmp += YLDC_HiddenCharacter;
  }
  node.innerText = tmp;
}

function filter_comments(comments){
  let len = comments.length;
  for(let i=0;i<len;++i){
    let node = comments[i];
    let author = node.children[0].innerText;
    if(YLDC_BLACKLIST.indexOf(author) != -1){
      let comment_node = node.children[1];
      register_comment(comment_node);
      filter_comment(comment_node);
      add_spoiler_style(comment_node);
    }
  }
}

function filter_messags(messages){
  let len = messages.length;
  for(let i=0;i<len;++i){
    let node = messages[i];
    let author = node.children[1].innerText;
    if(YLDC_BLACKLIST.indexOf(author) != -1){
      let comment_node = node.children[3].children[0];
      register_comment(comment_node);
      filter_comment(comment_node);
      add_spoiler_style(comment_node);
    }
  }
}

function scan_comments(){
  let comments = $(".ajaxChat_ClassMessage");
  if(comments.length > 0){
    return filter_comments(comments);
  }
  window.setTimeout(scan_comments, YLDC_UPDATE_DURATION);
}

function scan_messages(){
  let messages = $(".msg");
  if(messages.length > 0){
    return filter_messags(messages);
  }
  window.setTimeout(scan_messages, YLDC_UPDATE_DURATION);
}

function start(){
  if(window.location.pathname == "/forum/index.php"){
    window.setTimeout(scan_comments, YLDC_UPDATE_DURATION);
  }
  else if(window.location.pathname == "/forum/chat.php"){
    window.setTimeout(scan_messages, YLDC_UPDATE_DURATION);
  }
}

(function() {
  'use strict';
  window.addEventListener("load", start, null);
  // Your code here...
})();