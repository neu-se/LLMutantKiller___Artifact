let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should merge consecutive delete operations', function(done) {
        let delta = new quill_delta();
        delta.delete(3);
        delta.delete(2);
        assert.deepEqual(delta.ops, [{ delete: 5 }]);
        done();
    });
});