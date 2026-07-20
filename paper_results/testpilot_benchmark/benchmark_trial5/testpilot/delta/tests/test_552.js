let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose - basic insert composition', function(done) {
        const delta1 = new quill_delta([{insert: 'Hello'}]);
        const delta2 = new quill_delta([{retain: 5}, {insert: ' World'}]);
        const result = delta1.compose(delta2);
        
        assert.deepEqual(result.ops, [{insert: 'Hello World'}]);
        done();
    });
});