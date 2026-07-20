let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transformPosition - boundary conditions', function(done) {
        let delta = new quill_delta([
            { insert: 'start' },
            { retain: 10 },
            { delete: 3 },
            { insert: 'end' }
        ]);
        
        // Position 0 at very beginning
        assert.equal(delta.transformPosition(0), 5);
        
        // Large position beyond delta scope
        assert.equal(delta.transformPosition(1000), 1004);
        
        done();
    });
});