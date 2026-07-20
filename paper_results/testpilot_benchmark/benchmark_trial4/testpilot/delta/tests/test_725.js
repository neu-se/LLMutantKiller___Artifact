let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transformPosition - delete operations', function(done) {
        let delta = new quill_delta([
            { retain: 3 },
            { delete: 4 },
            { retain: 5 }
        ]);
        
        // Position before delete should remain unchanged
        assert.equal(delta.transformPosition(2), 2);
        
        // Position at start of delete range should stay at delete start
        assert.equal(delta.transformPosition(3), 3);
        
        // Position within delete range should move to delete start
        assert.equal(delta.transformPosition(5), 3);
        
        // Position after delete range should move back by delete length
        assert.equal(delta.transformPosition(8), 4);
        
        done();
    });
});