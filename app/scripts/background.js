/*global chrome*/

'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

//chrome.browserAction.setBadgeText({text: '\'kk'});

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.executeScript(null, {file: 'scripts/sticky-notes.js'});
});

//chrome.tabs.onActivated.addListener(function(){
//  chrome.tabs.query('active', function(active) {
//    if(active){
//      chrome.tabs.executeScript(null, 'alert("hello")');
//    }
//  });
//});