let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.map with empty delta', function(done) {
        let delta = new quill_delta([]);
        
        let mapped = delta.map(function(op) {
            return { insert: 'should not appear' };
        });
        
        assert.deepEqual(mapped.ops, []);
        done();
    });
});