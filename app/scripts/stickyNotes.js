/*global jQuery*/

'use strict';

var StickyNotes = (function($){

  var CSS_CLASS_PREFIX = 'kbsn';
  var $body = $('body');

  var NOTE_HTML = '<div class="kbsn-sticky-note">' +
    '<div class="kbsn-top">' +
    '<div class="add kbsn-icon plus"></div>' +
    '<div class="delete kbsn-icon close"></div>' +
    '</div>' +
    '<textarea class="kbsn-textarea" value=""></textarea>' +
    '</div>';

  var colourNote = function($note, colour) {
    $note.addClass(CSS_CLASS_PREFIX + '-' + colour);
    $note.colour = colour;
  };

  var create = function(colour) {
    var $note = $(NOTE_HTML);

    colourNote($note, colour);

    var $delete  = $note.find('.kbsn-icon.delete');
    $delete.click(function(){
      deleteNote($note);
    });

    var $add = $note.find('.kbsn-icon.add');
    $add.click(function(){
      add(create($note.colour));
    });

    $note.draggable();
    $note.resizable();

    return $note;
  };

  var add = function($note) {
    $body.append($note);
    $note.css({
      'position': 'absolute',
      'left' : 20,
      'top' : 20
    });
  };

  var deleteNote = function($note){
    $note.fadeOut(300, function(){
      $note.remove();
    });
  };

  return {
    create : create,
    add : add,
    deleteNote : deleteNote,
    colourNote : colourNote
  };
}(jQuery));

var $note = StickyNotes.create('pink');

StickyNotes.add($note);









