let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert - insert operations', function(done) {
        const base = new quill_delta();
        const delta = new quill_delta().insert('hello');
        const inverted = delta.invert(base);
        
        assert.equal(inverted.ops.length, 1);
        assert.equal(inverted.ops[0].delete, 5);
        done();
    });

    })