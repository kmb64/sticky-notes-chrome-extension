/*global chrome*/

'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.executeScript(null, {file: 'scripts/app.js'});
  console.log('init script loaded');
});
