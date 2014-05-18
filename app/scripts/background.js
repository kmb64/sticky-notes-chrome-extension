'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'kk'});

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.insertCSS({file: 'styles/stickyNotes.css'});

//  chrome.tabs.executeScript(null, {file: 'bower_components/jquery/dist/jquery.js'});

  chrome.tabs.executeScript(null, {file: 'scripts/stickNotes.js'});
});