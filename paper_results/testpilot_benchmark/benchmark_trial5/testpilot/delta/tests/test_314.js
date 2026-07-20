let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.retain', function(done) {
        // Test 1: Basic retain with positive length
        const delta1 = new quill_delta().retain(5);
        assert.deepEqual(delta1.ops, [{ retain: 5 }]);
        
        // Test 2: Retain with attributes
        const delta2 = new quill_delta().retain(3, { bold: true });
        assert.deepEqual(delta2.ops, [{ retain: 3, attributes: { bold: true } }]);
        
        // Test 3: Retain with multiple attributes
        const delta3 = new quill_delta().retain(2, { bold: true, italic: true, color: '#fff' });
        assert.deepEqual(delta3.ops, [{ retain: 2, attributes: { bold: true, italic: true, color: '#fff' } }]);
        
        // Test 4: Retain with zero length should return unchanged delta
        const delta4 = new quill_delta().insert('test');
        const result4 = delta4.retain(0);
        assert.strictEqual(result4, delta4); // Should return same instance
        assert.deepEqual(delta4.ops, [{ insert: 'test' }]); // Should be unchanged
        
        // Test 5: Retain with negative length should return unchanged delta
        const delta5 = new quill_delta().insert('test');
        const result5 = delta5.retain(-5);
        assert.strictEqual(result5, delta5); // Should return same instance
        assert.deepEqual(delta5.ops, [{ insert: 'test' }]); // Should be unchanged
        
        // Test 6: Retain with null attributes should not include attributes
        const delta6 = new quill_delta().retain(4, null);
        assert.deepEqual(delta6.ops, [{ retain: 4 }]);
        
        // Test 7: Retain with empty attributes object should not include attributes
        const delta7 = new quill_delta().retain(4, {});
        assert.deepEqual(delta7.ops, [{ retain: 4 }]);
        
        // Test 8: Retain with undefined attributes should not include attributes
        const delta8 = new quill_delta().retain(4, undefined);
        assert.deepEqual(delta8.ops, [{ retain: 4 }]);
        
        // Test 9: Chain multiple retain operations
        const delta9 = new quill_delta()
            .retain(5)
            .retain(3, { bold: true })
            .retain(2, { italic: true });
        assert.deepEqual(delta9.ops, [
            { retain: 5 },
            { retain: 3, attributes: { bold: true } },
            { retain: 2, attributes: { italic: true } }
        ]);
        
        // Test 10: Retain mixed with other operations (based on usage examples)
        const delta10 = new quill_delta()
            .retain(12)
            .insert('White', { color: '#fff' })
            .delete(4);
        assert.deepEqual(delta10.ops, [
            { retain: 12 },
            { insert: 'White', attributes: { color: '#fff' } },
            { delete: 4 }
        ]);
        
        done();
    });
});