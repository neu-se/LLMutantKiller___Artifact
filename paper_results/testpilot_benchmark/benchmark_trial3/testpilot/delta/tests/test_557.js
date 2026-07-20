let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.concat does not modify original deltas', function(done) {
        let delta1 = new quill_delta([{insert: 'Hello'}]);
        let delta2 = new quill_delta([{insert: 'World'}]);
        let originalLength1 = delta1.ops.length;
        let originalLength2 = delta2.ops.length;
        
        let result = delta1.concat(delta2);
        
        assert.strictEqual(delta1.ops.length, originalLength1);
        assert.strictEqual(delta2.ops.length, originalLength2);
        assert.strictEqual(result.ops.length, 2);
        done();
    });
});