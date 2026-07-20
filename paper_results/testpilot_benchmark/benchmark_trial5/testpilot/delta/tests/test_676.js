let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert with simple insert', function(done) {
        let base = new quill_delta([{insert: 'Hello'}]);
        let delta = new quill_delta([{insert: ' World'}]);
        let inverted = delta.invert(base);
        
        // Inverting an insert should produce a delete
        assert.deepEqual(inverted.ops, [{delete: 6}]);
        done();
    });
});