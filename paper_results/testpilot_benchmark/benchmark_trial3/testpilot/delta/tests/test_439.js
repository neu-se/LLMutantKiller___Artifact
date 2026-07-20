let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.partition with empty delta', function(done) {
        const delta = new quill_delta([]);
        
        const [passed, failed] = delta.partition(op => true);
        
        assert.equal(passed.length, 0);
        assert.equal(failed.length, 0);
        done();
    });
});