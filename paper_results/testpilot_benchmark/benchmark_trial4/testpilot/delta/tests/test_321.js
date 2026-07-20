let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.retain', function(done) {
        // Test 1: Basic retain without attributes
        const delta1 = new quill_delta().retain(5);
        assert.deepEqual(delta1.ops, [{ retain: 5 }]);
        
        // Test 2: Retain with attributes
        const delta2 = new quill_delta().retain(3, { bold: true });
        assert.deepEqual(delta2.ops, [{ retain: 3, attributes: { bold: true } }]);
        
        // Test 3: Multiple retain operations
        const delta3 = new quill_delta()
            .retain(2)
            .retain(3, { italic: true })
            .retain(1, { color: 'red' });
        assert.deepEqual(delta3.ops, [
            { retain: 2 },
            { retain: 3, attributes: { italic: true } },
            { retain: 1, attributes: { color: 'red' } }
        ]);
        
        // Test 4: Retain with complex attributes
        const delta4 = new quill_delta().retain(10, { 
            bold: true, 
            italic: true, 
            color: '#fff' 
        });
        assert.deepEqual(delta4.ops, [{ 
            retain: 10, 
            attributes: { 
                bold: true, 
                italic: true, 
                color: '#fff' 
            } 
        }]);
        
        // Test 5: Retain zero length (should not add operation)
        const delta5 = new quill_delta().retain(0);
        assert.deepEqual(delta5.ops, []);
        
        // Test 6: Chaining retain with other operations
        const delta6 = new quill_delta()
            .retain(12)
            .insert('White', { color: '#fff' })
            .delete(4);
        assert.deepEqual(delta6.ops, [
            { retain: 12 },
            { insert: 'White', attributes: { color: '#fff' } },
            { delete: 4 }
        ]);
        
        // Test 7: Retain with null attributes (should remove attributes)
        const delta7 = new quill_delta().retain(6, { bold: null });
        assert.deepEqual(delta7.ops, [{ retain: 6, attributes: { bold: null } }]);
        
        done();
    });
});