/*global describe, beforeEach, it, StickyNotes, spyOn, expect, $*/

'use strict';

describe('Sticky notes', function () {

  var $body;

  beforeEach(function () {
    $body = {
      append : function(){}
    };
  });

  it('should construct a coloured sticky note', function(){

    var expected = $('<div class="note pink">' +
      '<div class="top">' +
      '<div class="add icon plus"></div>' +
      '<div class="delete icon close"></div>' +
      '</div>' +
      '<textarea class="textarea" value=""></textarea>' +
      '</div>').html();
    expect(StickyNotes.create('pink').html()).toBe(expected);
  });

  it('should add a sticky note to a web page', function(){
    var spy = spyOn($body, 'append');

    var $note = StickyNotes.create('pink');
    StickyNotes.add($body, $note);

    expect(spy).toHaveBeenCalledWith($note.draggable());
  });

  it('should make the sticky note draggable', function(){
    var spy = spyOn($.fn, 'draggable');

    var $note = StickyNotes.create('pink');
    StickyNotes.add($body, $note);

    expect(spy).toHaveBeenCalled();
  });

  it('should make the sticky note resizable', function(){
    var spy = spyOn($.fn, 'resizable');

    var $note = StickyNotes.create('pink');
    StickyNotes.add($body, $note);

    expect(spy).toHaveBeenCalled();
  });

  it('should be able to delete a sticky note', function(){
    var spy = spyOn($.fn, 'remove');

    var $note = StickyNotes.create('pink');
    StickyNotes.add($body, $note);
    StickyNotes.deleteNote($note);

    expect(spy).toHaveBeenCalled();
  });

  it('should position a sticky note correctly on the page', function(){
    var spy = spyOn($.fn, 'css');

    var $note = StickyNotes.create('pink');
    StickyNotes.add($body, $note);

    expect(spy).toHaveBeenCalledWith({'left' : 20, 'top' : 20});
  });

});
