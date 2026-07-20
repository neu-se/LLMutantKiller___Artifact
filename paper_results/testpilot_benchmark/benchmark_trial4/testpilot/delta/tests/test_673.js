let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert with mixed operations', function(done) {
        let base = new quill_delta([{insert: 'Hello'}, {insert: ' World', attributes: {bold: true}}]);
        let change = new quill_delta([
            {retain: 2},
            {delete: 3},
            {insert: 'y'},
            {retain: 6, attributes: {bold: null}}
        ]);
        let inverted = change.invert(base);
        
        // The inverted delta should undo all changes
        let expected = [
            {retain: 2},
            {delete: 1},
            {insert: 'llo'},
            {retain: 6, attributes: {bold: true}}
        ];
        assert.deepEqual(inverted.ops, expected);
        done();
    });
});