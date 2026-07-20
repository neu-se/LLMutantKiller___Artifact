let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert - delete operations', function(done) {
        const base = new Delta().insert('Hello World');
        const delta = new Delta().delete(5);
        const inverted = delta.invert(base);
        
        // Deleting should be inverted to inserting the deleted content
        assert.deepEqual(inverted.ops, [{ insert: 'Hello' }]);
        done();
    });

    })