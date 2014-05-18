/*global $, jQuery*/

'use strict';

var StickyNotes = (function($){

  var create = function(colour) {
    return $('<div class="note ' + colour +'">' +
      '<div class="top">' +
      '<div class="add icon plus"></div>' +
      '<div class="delete icon close"></div>' +
      '</div>' +
      '<textarea class="textarea" value=""></textarea>' +
      '</div>');
  };

  var add = function($elm, $note) {

    $elm.append($note);
    $note.draggable();
    $note.resizable();
    $note.css({
      'left' : 20,
      'top' : 20
    });
  };

  var deleteNote = function($note){
    $note.remove();
  };

  return {
    create : create,
    add : add,
    deleteNote : deleteNote
  };
}(jQuery));

var $body = $('body');

var note = StickyNotes.create('pink');

StickyNotes.add($body, note);









