/*global $, jQuery*/

'use strict';

var StickyNotes = (function($){

  var create = function(colour) {
    return '<div class="note ' + colour +'"></div>';
  };

  var add = function($elm, stickyNote) {
    $elm.append($(stickyNote).draggable());
  };

  return {
    create : create,
    add : add
  };
}(jQuery));

var $body = $('body');

var note = StickyNotes.create('pink');

StickyNotes.add($body, note);









