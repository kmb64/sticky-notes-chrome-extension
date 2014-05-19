/*global describe, beforeEach, it, StickyNotes, spyOn, expect, $*/

'use strict';

describe('Sticky notes', function () {

  beforeEach(function () {
  });

  it('should construct a coloured sticky note', function(){

    var expected = '<div class="top">' +
      '<div class="add icon plus">' +
      '</div><div class="delete icon close"></div>' +
      '</div>' +
      '<textarea class="textarea" value=""></textarea>' +
      '<div class="ui-resizable-handle ui-resizable-e" style="z-index: 90; display: block;"></div>' +
      '<div class="ui-resizable-handle ui-resizable-s" style="z-index: 90; display: block;"></div>' +
      '<div class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 90; display: block;">' +
      '</div>';

    expect(StickyNotes.create('pink').html()).toEqual(expected);
  });

  it('should add a sticky note to a web page', function(){
    var spy = spyOn($.fn, 'append');

    var $note = StickyNotes.create('pink');
    StickyNotes.add($note);

    expect(spy).toHaveBeenCalledWith($note);
  });

  it('should make the sticky note draggable', function(){
    var spy = spyOn($.fn, 'draggable');

    var $note = StickyNotes.create('pink');
    StickyNotes.add($note);

    expect(spy).toHaveBeenCalled();
  });

  it('should make the sticky note resizable', function(){
    var spy = spyOn($.fn, 'resizable');

    var $note = StickyNotes.create('pink');
    StickyNotes.add($note);

    expect(spy).toHaveBeenCalled();
  });

  it('should be able to delete a sticky note', function(){
    var spy = spyOn($.fn, 'remove');

    StickyNotes.deleteNote($('<div></div>'));

    expect(spy).toHaveBeenCalled();
  });

  it('should position a sticky note correctly on the page', function(){
    var spy = spyOn($.fn, 'css');

    var $note = StickyNotes.create('pink');
    StickyNotes.add($note);

    expect(spy).toHaveBeenCalledWith({'position': 'absolute','left' : 20, 'top' : 20});
  });

  it('should colour a sticky note', function(){
    var $note = $('<div></div>');
    StickyNotes.colourNote($note, 'pink');
    expect($note.hasClass('pink')).toBeTruthy();
    expect($note.colour).toBe('pink');
  });

});
