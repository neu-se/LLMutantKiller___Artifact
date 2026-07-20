let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transformPosition - basic retain operations', function(done) {
        let delta = new quill_delta([
            { retain: 5 },
            { insert: 'hello' },
            { retain: 3 }
        ]);
        
        // Position before insertion point should remain unchanged
        assert.equal(delta.transformPosition(2), 2);
        
        // Position at insertion point should move forward by insert length
        assert.equal(delta.transformPosition(5), 10);
        
        // Position after insertion point should move forward by insert length
        assert.equal(delta.transformPosition(7), 12);
        
        done();
    });
});