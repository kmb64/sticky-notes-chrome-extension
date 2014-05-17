/*global describe, beforeEach, it, StickyNotes, spyOn, expect, $*/

'use strict';

describe('Sticky notes', function () {

  var $body,
    $note;

  beforeEach(function () {
    $body = {
      append : function(){}
    };
    $note = {};
  });

  it('should construct a coloured sticky note', function(){
    var expected ='<div class="note pink"></div>';
    expect(StickyNotes.create('pink')).toBe(expected);
  });

  it('should add a sticky note to a web page', function(){
    var spy = spyOn($body, 'append');

    var note = StickyNotes.create('pink');
    StickyNotes.add($body, note);

    expect(spy).toHaveBeenCalledWith($(note).draggable());
  });

  it('it should allow the sticky note to be draggable when it\'s been added to the page', function(){
    var spy = spyOn($.fn, 'draggable');
    StickyNotes.add($body, $note);
    expect(spy).toHaveBeenCalled();
  });
});
