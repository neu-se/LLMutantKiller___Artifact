let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose - retain at beginning', function(done) {
        const delta1 = new quill_delta([{insert: 'ABC'}, {insert: 'DEF'}]);
        const delta2 = new quill_delta([{retain: 2}, {insert: 'X'}]);
        const result = delta1.compose(delta2);
        
        assert.deepEqual(result.ops, [{insert: 'ABXCDEF'}]);
        done();
    });
});