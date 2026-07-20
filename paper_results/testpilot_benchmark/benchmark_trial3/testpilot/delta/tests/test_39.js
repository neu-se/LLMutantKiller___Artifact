let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should delete specified length', function(done) {
        let delta = new quill_delta();
        delta.delete(5);
        assert.deepEqual(delta.ops, [{ delete: 5 }]);
        done();
    });
});