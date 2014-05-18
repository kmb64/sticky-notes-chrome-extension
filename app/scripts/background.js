'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'kk'});

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.executeScript(null, {file: 'scripts/stickyNotes.js'});
});