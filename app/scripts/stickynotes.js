/*global $, jQuery*/

'use strict';

var StickyNotes = (function($){

  var create = function(colour) {
    return $('<div class="note ' + colour +'"><textarea class="textarea" value=""></textarea></div>');
  };

  var add = function($elm, $note) {
    $elm.append($note.draggable());
  };

  return {
    create : create,
    add : add
  };
}(jQuery));

var $body = $('body');

var note = StickyNotes.create('pink');

StickyNotes.add($body, note);









