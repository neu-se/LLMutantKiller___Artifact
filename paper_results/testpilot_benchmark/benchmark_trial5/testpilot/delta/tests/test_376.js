let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.chop - handles empty delta', function(done) {
        let delta = new quill_delta([]);
        
        let chopped = delta.chop();
        
        assert.deepEqual(chopped.ops, []);
        done();
    });
});