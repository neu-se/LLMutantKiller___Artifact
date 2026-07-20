let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta basic functionality - should create and manipulate deltas', function(done) {
        // Test basic Delta creation
        let delta1 = new Delta([{insert: 'Hello'}]);
        assert.ok(delta1, 'Delta should be created');
        
        // Test Delta composition
        let delta2 = new Delta([{insert: ' World'}]);
        let composed = delta1.compose(delta2);
        assert.ok(composed, 'Delta composition should work');
        
        // Test Delta with attributes
        let deltaWithAttrs = new Delta([{insert: 'Bold text', attributes: {bold: true}}]);
        assert.ok(deltaWithAttrs, 'Delta with attributes should be created');
        
        // Test Delta operations
        let ops = deltaWithAttrs.ops;
        assert.ok(Array.isArray(ops), 'Delta ops should be an array');
        assert.equal(ops.length, 1, 'Should have one operation');
        assert.equal(ops[0].insert, 'Bold text', 'Insert text should match');
        assert.equal(ops[0].attributes.bold, true, 'Bold attribute should be true');
        
        done();
    });
});