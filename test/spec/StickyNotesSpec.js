/*global describe, beforeEach, it, appendNote, spyOn, expect*/

'use strict';

describe('Sticky notes', function () {

  var note,
    document;

  beforeEach(function () {
    note =
      '<div class="note pink-note">' +
      '<div class="pink-note-top"></div>' +
      '<textarea class="note-textarea" value=""></textarea>' +
      '</div>';

    document = {
      body : {
        insertAdjacentHTML : function(){}
      }
    };

  });

  it('should append a note to the document', function () {
    spyOn(document.body, 'insertAdjacentHTML');
    appendNote(note, document);
    expect(document.body.insertAdjacentHTML).toHaveBeenCalledWith('beforeend', note);
  });

});
