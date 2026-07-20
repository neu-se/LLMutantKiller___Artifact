let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.delete - multiple delete operations', function(done) {
        let delta = new quill_delta();
        delta.delete(3).delete(2);
        
        assert.strictEqual(delta.ops.length, 2, 'should have two operations');
        assert.strictEqual(delta.ops[0].delete, 3, 'first operation should delete 3');
        assert.strictEqual(delta.ops[1].delete, 2, 'second operation should delete 2');
        done();
    });

    })