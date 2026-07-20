let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose - multiple retains and inserts', function(done) {
        const delta1 = new quill_delta([{insert: 'ABCD'}]);
        const delta2 = new quill_delta([{retain: 2}, {insert: 'X'}, {retain: 2}]);
        const result = delta1.compose(delta2);
        
        assert.deepEqual(result.ops, [{insert: 'ABXCD'}]);
        done();
    });
});