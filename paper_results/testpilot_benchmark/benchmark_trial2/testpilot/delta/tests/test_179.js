let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert - insert operations', function(done) {
        const base = new Delta().insert('Hello');
        const delta = new Delta().insert('World');
        const inverted = delta.invert(base);
        
        // Inverting an insert should create a delete
        assert.equal(inverted.ops.length, 1);
        assert.equal(inverted.ops[0].delete, 5); // "World" has 5 characters
        done();
    });

    })