/*global jQuery*/

'use strict';

var StickyNotes = (function($){

  var $body = $('body');

  var NOTE_HTML = '<div class="note">' +
    '<div class="top">' +
    '<div class="add icon plus"></div>' +
    '<div class="delete icon close"></div>' +
    '</div>' +
    '<textarea class="textarea" value=""></textarea>' +
    '</div>';

  var colourNote = function($note, colour) {
    $note.addClass(colour);
    $note.colour = colour;
  };

  var create = function(colour) {
    var $note = $(NOTE_HTML);

    colourNote($note, colour);

    var $delete  = $note.find('.icon.delete');
    $delete.click(function(){
      deleteNote($note);
    });

    var $add = $note.find('.icon.add');
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
    deleteNote : deleteNote
  };
}(jQuery));

var $note = StickyNotes.create('pink');

StickyNotes.add($note);









