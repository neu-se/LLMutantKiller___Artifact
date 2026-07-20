let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert - retain without attributes', function(done) {
        const base = new Delta().insert('Hello World');
        const delta = new Delta().retain(5);
        const inverted = delta.invert(base);
        
        // Retain without attributes should remain the same
        assert.deepEqual(inverted.ops, [{ retain: 5 }]);
        done();
    });

    })