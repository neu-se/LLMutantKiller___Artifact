let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.reduce with empty delta', function(done) {
        // Create an empty delta
        let delta = new quill_delta();
        
        // Test reduce on empty delta returns initial value
        let result = delta.reduce((acc, op) => {
            return acc + 1;
        }, 42);
        
        assert.strictEqual(result, 42);
        done();
    });
});