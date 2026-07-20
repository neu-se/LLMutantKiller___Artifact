let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert with empty change', function(done) {
        let base = new quill_delta([{insert: 'Hello'}]);
        let change = new quill_delta();
        let inverted = change.invert(base);
        
        // The inverted delta should be empty
        assert.deepEqual(inverted.ops, []);
        done();
    });
});