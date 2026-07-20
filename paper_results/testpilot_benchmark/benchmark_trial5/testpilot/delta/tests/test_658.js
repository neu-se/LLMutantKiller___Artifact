let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert - complex operations', function(done) {
        const base = new Delta()
            .insert('Hello')
            .insert(' ')
            .insert('World');
        
        const delta = new Delta()
            .retain(5)
            .delete(1)
            .insert('!');
        
        const inverted = delta.invert(base);
        
        // Should retain 5, insert the deleted space, delete the inserted exclamation
        assert.deepEqual(inverted.ops, [
            { retain: 5 },
            { insert: ' ' },
            { delete: 1 }
        ]);
        done();
    });

    })