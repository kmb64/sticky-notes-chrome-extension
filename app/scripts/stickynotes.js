'use strict';

var note =
  '<div class="note pink-note">' +
  '<div class="pink-note-top"></div>' +
  '<textarea class="note-textarea" value=""></textarea>' +
  '</div>';

var appendNote = function (note, document) {
  document.body.insertAdjacentHTML('beforeend', note);
};

appendNote(note, document);


