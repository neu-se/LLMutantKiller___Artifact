let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert with mixed operations', function(done) {
        let base = new quill_delta([{insert: 'Hello'}, {insert: ' World', attributes: {bold: true}}]);
        let delta = new quill_delta([
            {retain: 5},
            {delete: 1},
            {insert: '!'},
            {retain: 5, attributes: {bold: null}}
        ]);
        let inverted = delta.invert(base);
        
        // Complex inversion should handle multiple operation types
        assert.deepEqual(inverted.ops, [
            {retain: 5},
            {delete: 1},
            {insert: ' '},
            {retain: 5, attributes: {bold: true}}
        ]);
        done();
    });
});