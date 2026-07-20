let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert - empty delta', function(done) {
        const base = new Delta().insert('Hello');
        const delta = new Delta();
        const inverted = delta.invert(base);
        
        // Empty delta should result in empty inverted delta
        assert.deepEqual(inverted.ops, []);
        done();
    });
});