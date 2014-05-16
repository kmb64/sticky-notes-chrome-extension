'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'hi'});

chrome.browserAction.onClicked.addListener(function () {
  chrome.browserAction.setBadgeText({text: '\'bye'});
  chrome.tabs.executeScript(null, {file: 'scripts/stickynotes.js'});
});