let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert - insert operations', function(done) {
        const base = new Delta().insert('Hello');
        const delta = new Delta().insert('World');
        const inverted = delta.invert(base);
        
        // Inserting "World" should be inverted to deleting 5 characters
        assert.deepEqual(inverted.ops, [{ delete: 5 }]);
        done();
    });

    })