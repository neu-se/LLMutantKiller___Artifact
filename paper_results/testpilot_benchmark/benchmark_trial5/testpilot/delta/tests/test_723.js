let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transformPosition - empty delta', function(done) {
        let delta = new quill_delta();
        
        // Empty delta should not transform any position
        assert.equal(delta.transformPosition(0), 0);
        assert.equal(delta.transformPosition(5), 5);
        assert.equal(delta.transformPosition(100), 100);
        
        done();
    });
});