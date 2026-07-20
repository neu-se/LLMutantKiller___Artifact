let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert', function(done) {
        // Test 1: Basic inversion - adding attributes
        const attr1 = { bold: true, italic: true };
        const base1 = {};
        const inverted1 = quill_delta.AttributeMap.invert(attr1, base1);
        const expected1 = { bold: null, italic: null };
        assert.deepEqual(inverted1, expected1, 'Should invert added attributes to null');

        // Test 2: Basic inversion - removing attributes
        const attr2 = {};
        const base2 = { bold: true, italic: true };
        const inverted2 = quill_delta.AttributeMap.invert(attr2, base2);
        const expected2 = { bold: true, italic: true };
        assert.deepEqual(inverted2, expected2, 'Should restore removed attributes');

        // Test 3: Mixed changes - modify existing and add new
        const attr3 = { bold: false, italic: true, underline: true };
        const base3 = { bold: true, color: 'red' };
        const inverted3 = quill_delta.AttributeMap.invert(attr3, base3);
        const expected3 = { bold: true, color: 'red', italic: null, underline: null };
        assert.deepEqual(inverted3, expected3, 'Should handle mixed attribute changes');

        // Test 4: No changes
        const attr4 = { bold: true, italic: false };
        const base4 = { bold: true, italic: false };
        const inverted4 = quill_delta.AttributeMap.invert(attr4, base4);
        const expected4 = {};
        assert.deepEqual(inverted4, expected4, 'Should return empty object when no changes');

        // Test 5: Empty inputs
        const attr5 = {};
        const base5 = {};
        const inverted5 = quill_delta.AttributeMap.invert(attr5, base5);
        const expected5 = {};
        assert.deepEqual(inverted5, expected5, 'Should handle empty inputs');

        // Test 6: Null/undefined inputs
        const inverted6 = quill_delta.AttributeMap.invert(null, { bold: true });
        const expected6 = { bold: true };
        assert.deepEqual(inverted6, expected6, 'Should handle null attr input');

        const inverted7 = quill_delta.AttributeMap.invert(undefined, { bold: true });
        const expected7 = { bold: true };
        assert.deepEqual(inverted7, expected7, 'Should handle undefined attr input');

        // Test 7: Complex attribute values
        const attr8 = { 
            bold: true, 
            color: 'blue', 
            font: 'Arial',
            size: 14
        };
        const base8 = { 
            bold: false, 
            color: 'red', 
            background: 'yellow'
        };
        const inverted8 = quill_delta.AttributeMap.invert(attr8, base8);
        const expected8 = { 
            bold: false, 
            color: 'red', 
            background: 'yellow',
            font: null,
            size: null
        };
        assert.deepEqual(inverted8, expected8, 'Should handle complex attribute changes');

        // Test 8: Verify inversion property - applying attr then inverted should restore base
        const testAttr = { bold: true, italic: false, color: 'blue' };
        const testBase = { bold: false, underline: true, color: 'red' };
        const testInverted = quill_delta.AttributeMap.invert(testAttr, testBase);
        
        // Simulate applying attributes and then inverting
        const applied = Object.assign({}, testBase, testAttr);
        const restored = Object.assign({}, applied);
        
        // Apply inverted attributes
        Object.keys(testInverted).forEach(key => {
            if (testInverted[key] === null) {
                delete restored[key];
            } else {
                restored[key] = testInverted[key];
            }
        });
        
        // Remove undefined values for comparison
        const cleanBase = Object.keys(testBase).reduce((acc, key) => {
            if (testBase[key] !== undefined) acc[key] = testBase[key];
            return acc;
        }, {});
        
        assert.deepEqual(restored, cleanBase, 'Applying inverted attributes should restore original base');

        done();
    });
});