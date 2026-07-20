let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.retain - basic retain without attributes', function(done) {
        let delta = new quill_delta();
        let result = delta.retain(5);
        
        assert.strictEqual(result, delta, 'retain should return the delta instance for chaining');
        assert.strictEqual(delta.ops.length, 1, 'should have one operation');
        assert.strictEqual(delta.ops[0].retain, 5, 'should retain 5 characters');
        assert.strictEqual(delta.ops[0].attributes, undefined, 'should have no attributes');
        done();
    });

    })