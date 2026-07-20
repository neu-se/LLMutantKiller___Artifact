let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.delete', function(done) {
        // Test 1: Delete with positive length
        let delta1 = new quill_delta();
        let result1 = delta1.delete(5);
        assert.strictEqual(result1.ops.length, 1);
        assert.deepStrictEqual(result1.ops[0], { delete: 5 });
        
        // Test 2: Delete with zero length should return same instance
        let delta2 = new quill_delta();
        let result2 = delta2.delete(0);
        assert.strictEqual(result2, delta2);
        assert.strictEqual(result2.ops.length, 0);
        
        // Test 3: Delete with negative length should return same instance
        let delta3 = new quill_delta();
        let result3 = delta3.delete(-3);
        assert.strictEqual(result3, delta3);
        assert.strictEqual(result3.ops.length, 0);
        
        // Test 4: Multiple delete operations (they get combined)
        let delta4 = new quill_delta();
        let result4 = delta4.delete(2).delete(3);
        assert.strictEqual(result4.ops.length, 1);
        assert.deepStrictEqual(result4.ops[0], { delete: 5 });
        
        // Test 5: Delete operation on delta with existing operations
        let delta5 = new quill_delta([{ insert: 'hello' }]);
        let result5 = delta5.delete(1);
        assert.strictEqual(result5.ops.length, 2);
        assert.deepStrictEqual(result5.ops[0], { insert: 'hello' });
        assert.deepStrictEqual(result5.ops[1], { delete: 1 });
        
        done();
    });
});