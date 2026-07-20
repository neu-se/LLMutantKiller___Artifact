let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert', function(done) {
        // Test 1: Basic attribute inversion
        const attr1 = { bold: true, italic: false };
        const base1 = { bold: false, color: 'red' };
        const inverted1 = quill_delta.AttributeMap.invert(attr1, base1);
        
        // Should invert bold from true to false (base value)
        // Should invert italic from false to undefined (not in base)
        // Should not include color since it wasn't in attr
        assert.deepEqual(inverted1, { bold: false, italic: null });
        
        // Test 2: Empty attribute map
        const attr2 = {};
        const base2 = { bold: true, italic: false };
        const inverted2 = quill_delta.AttributeMap.invert(attr2, base2);
        
        // Should return empty object when no attributes to invert
        assert.deepEqual(inverted2, {});
        
        // Test 3: Attribute not in base
        const attr3 = { underline: true, strike: false };
        const base3 = { bold: true };
        const inverted3 = quill_delta.AttributeMap.invert(attr3, base3);
        
        // Should set attributes not in base to null
        assert.deepEqual(inverted3, { underline: null, strike: null });
        
        // Test 4: Mixed scenario
        const attr4 = { bold: true, italic: false, underline: true };
        const base4 = { bold: false, italic: true };
        const inverted4 = quill_delta.AttributeMap.invert(attr4, base4);
        
        // Should restore base values for bold and italic, null for underline
        assert.deepEqual(inverted4, { bold: false, italic: true, underline: null });
        
        // Test 5: Default parameters
        const inverted5 = quill_delta.AttributeMap.invert();
        assert.deepEqual(inverted5, {});
        
        // Test 6: Only attr provided
        const attr6 = { bold: true, color: 'blue' };
        const inverted6 = quill_delta.AttributeMap.invert(attr6);
        
        // Should set all attributes to null when no base provided
        assert.deepEqual(inverted6, { bold: null, color: null });
        
        done();
    });
});