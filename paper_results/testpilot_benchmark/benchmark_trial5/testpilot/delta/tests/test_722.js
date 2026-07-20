let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transformPosition - complex operations', function(done) {
        let delta = new quill_delta([
            { retain: 2 },
            { insert: 'ab' },
            { retain: 3 },
            { delete: 2 },
            { insert: 'cd' },
            { retain: 4 }
        ]);
        
        // Position 0-1: before first operation
        assert.equal(delta.transformPosition(1), 1);
        
        // Position 2: at first insert
        assert.equal(delta.transformPosition(2), 4);
        
        // Position 5: in middle, after first insert but before delete
        assert.equal(delta.transformPosition(5), 7);
        
        // Position 7: at delete start
        assert.equal(delta.transformPosition(7), 7);
        
        // Position 9: after delete, should account for both delete and second insert
        assert.equal(delta.transformPosition(9), 9);
        
        done();
    });
});