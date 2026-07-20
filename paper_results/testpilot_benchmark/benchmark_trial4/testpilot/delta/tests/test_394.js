let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.filter - empty result', function(done) {
        let delta = new quill_delta([
            { retain: 5 },
            { insert: 'hello' },
            { delete: 3 }
        ]);
        
        // Filter operations that don't exist
        let filtered = delta.filter(op => op.nonexistent !== undefined);
        
        assert.equal(filtered.ops.length, 0);
        done();
    });
});