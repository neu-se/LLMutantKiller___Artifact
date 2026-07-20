let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert', function(done) {
        // Test 1: Basic attribute inversion
        const attr1 = { bold: true, italic: false };
        const base1 = { bold: false, color: 'red' };
        const inverted1 = quill_delta.AttributeMap.invert(attr1, base1);
        
        // Should invert bold from true to false, and restore color from base
        assert.deepEqual(inverted1, { bold: false, italic: null, color: 'red' });
        
        // Test 2: Empty attribute map
        const attr2 = {};
        const base2 = { bold: true, italic: true };
        const inverted2 = quill_delta.AttributeMap.invert(attr2, base2);
        
        // Should return empty object when no attributes to invert
        assert.deepEqual(inverted2, {});
        
        // Test 3: Attribute with null values (removal)
        const attr3 = { bold: null, italic: true };
        const base3 = { bold: true, underline: true };
        const inverted3 = quill_delta.AttributeMap.invert(attr3, base3);
        
        // Should restore bold from base and remove italic
        assert.deepEqual(inverted3, { bold: true, italic: null });
        
        // Test 4: No base attributes
        const attr4 = { bold: true, italic: false };
        const base4 = {};
        const inverted4 = quill_delta.AttributeMap.invert(attr4, base4);
        
        // Should invert to null values when no base to restore from
        assert.deepEqual(inverted4, { bold: null, italic: null });
        
        // Test 5: Default parameters
        const inverted5 = quill_delta.AttributeMap.invert();
        
        // Should handle default empty objects
        assert.deepEqual(inverted5, {});
        
        done();
    });
});