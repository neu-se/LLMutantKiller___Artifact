let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.delete - basic delete operation', function(done) {
        let delta = new quill_delta();
        let result = delta.delete(5);
        
        assert.strictEqual(result, delta, 'delete should return the delta instance for chaining');
        assert.strictEqual(delta.ops.length, 1, 'should have one operation');
        assert.strictEqual(delta.ops[0].delete, 5, 'should have delete operation with length 5');
        done();
    });

    })