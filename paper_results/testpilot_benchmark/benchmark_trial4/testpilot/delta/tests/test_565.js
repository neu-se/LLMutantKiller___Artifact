let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.concat - original deltas unchanged', function(done) {
        let delta1 = new quill_delta([
            { insert: 'Hello' }
        ]);
        let delta2 = new quill_delta([
            { insert: ' World' }
        ]);
        
        let originalDelta1Length = delta1.ops.length;
        let originalDelta2Length = delta2.ops.length;
        
        let result = delta1.concat(delta2);
        
        // Verify original deltas are unchanged
        assert.equal(delta1.ops.length, originalDelta1Length);
        assert.equal(delta2.ops.length, originalDelta2Length);
        assert.equal(delta1.ops[0].insert, 'Hello');
        assert.equal(delta2.ops[0].insert, ' World');
        
        // Verify result is correct
        assert.equal(result.ops.length, 2);
        done();
    });
});