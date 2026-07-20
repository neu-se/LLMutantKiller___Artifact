let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.delete', function(done) {
        // Test 1: Delete with positive length
        const delta1 = new quill_delta();
        const result1 = delta1.delete(5);
        assert.deepEqual(result1.ops, [{ delete: 5 }]);
        
        // Test 2: Delete with zero length should return same instance
        const delta2 = new quill_delta();
        const result2 = delta2.delete(0);
        assert.strictEqual(result2, delta2);
        assert.deepEqual(result2.ops, []);
        
        // Test 3: Delete with negative length should return same instance
        const delta3 = new quill_delta();
        const result3 = delta3.delete(-3);
        assert.strictEqual(result3, delta3);
        assert.deepEqual(result3.ops, []);
        
        // Test 4: Chain delete operations
        const delta4 = new quill_delta();
        const result4 = delta4.retain(12).insert('White', { color: '#fff' }).delete(4);
        assert.deepEqual(result4.ops, [
            { retain: 12 },
            { insert: 'White', attributes: { color: '#fff' } },
            { delete: 4 }
        ]);
        
        // Test 5: Delete after existing operations
        const delta5 = new quill_delta().insert('Hello');
        const result5 = delta5.delete(2);
        assert.deepEqual(result5.ops, [
            { insert: 'Hello' },
            { delete: 2 }
        ]);
        
        // Test 6: Multiple delete operations
        const delta6 = new quill_delta();
        const result6 = delta6.delete(3).delete(2);
        assert.deepEqual(result6.ops, [
            { delete: 3 },
            { delete: 2 }
        ]);
        
        done();
    });
});