let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.insert with empty string', function(done) {
        let delta = new quill_delta();
        let result = delta.insert('');
        
        // Empty inserts are typically ignored or handled specially
        assert.strictEqual(result.ops.length, 0);
        done();
    });
});