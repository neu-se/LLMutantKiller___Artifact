let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.delete - negative length handling', function(done) {
        let delta = new quill_delta();
        let result = delta.delete(-5);
        
        assert.strictEqual(result, delta, 'delete should return the delta instance');
        assert.strictEqual(delta.ops.length, 0, 'should have no operations for negative length');
        done();
    });
});