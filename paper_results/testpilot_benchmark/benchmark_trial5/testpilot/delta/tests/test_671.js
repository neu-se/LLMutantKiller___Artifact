let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert', function(done) {
        // Test case 1: Basic invert with retain, insert, and delete operations
        const base1 = new Delta().insert('Hello\n').insert('World');
        const delta1 = new Delta().retain(6, { bold: true }).insert('!').delete(5);
        const inverted1 = delta1.invert(base1);
        
        // Verify the inverted delta has the expected operations
        assert.equal(inverted1.ops.length, 3);
        assert.deepEqual(inverted1.ops[0], { retain: 6, attributes: { bold: null } });
        assert.deepEqual(inverted1.ops[1], { insert: 'World' });
        assert.deepEqual(inverted1.ops[2], { delete: 1 });
        
        // Verify that base.compose(delta).compose(inverted) equals base
        const result1 = base1.compose(delta1).compose(inverted1);
        assert.deepEqual(result1, base1);
        
        // Test case 2: Simple insert operation
        const base2 = new Delta().insert('Hello');
        const delta2 = new Delta().retain(5).insert(' World');
        const inverted2 = delta2.invert(base2);
        
        // The inverted operation should delete the inserted text
        assert.equal(inverted2.ops.length, 2);
        assert.deepEqual(inverted2.ops[0], { retain: 5 });
        assert.deepEqual(inverted2.ops[1], { delete: 6 }); // Delete ' World'
        
        // Verify composition property
        const result2 = base2.compose(delta2).compose(inverted2);
        assert.deepEqual(result2, base2);
        
        // Test case 3: Simple delete operation
        const base3 = new Delta().insert('Hello World');
        const delta3 = new Delta().retain(5).delete(6); // Delete ' World'
        const inverted3 = delta3.invert(base3);
        
        // The inverted operation should insert back the deleted text
        assert.equal(inverted3.ops.length, 2);
        assert.deepEqual(inverted3.ops[0], { retain: 5 });
        assert.deepEqual(inverted3.ops[1], { insert: ' World' });
        
        // Verify composition property
        const result3 = base3.compose(delta3).compose(inverted3);
        assert.deepEqual(result3, base3);
        
        // Test case 4: Attribute changes only
        const base4 = new Delta().insert('Hello', { bold: true });
        const delta4 = new Delta().retain(5, { bold: false, italic: true });
        const inverted4 = delta4.invert(base4);
        
        // The inverted operation should restore original attributes
        assert.equal(inverted4.ops.length, 1);
        assert.deepEqual(inverted4.ops[0], { retain: 5, attributes: { bold: true, italic: null } });
        
        // Verify composition property
        const result4 = base4.compose(delta4).compose(inverted4);
        assert.deepEqual(result4, base4);
        
        // Test case 5: Empty delta
        const base5 = new Delta().insert('Hello');
        const delta5 = new Delta();
        const inverted5 = delta5.invert(base5);
        
        // Empty delta should have empty invert
        assert.equal(inverted5.ops.length, 0);
        
        // Verify composition property
        const result5 = base5.compose(delta5).compose(inverted5);
        assert.deepEqual(result5, base5);
        
        done();
    });
});