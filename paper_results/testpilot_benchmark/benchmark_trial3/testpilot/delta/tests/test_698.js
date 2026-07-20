let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test transform with insert operations and priority', function(done) {
        let delta1 = new Delta([{insert: 'A'}]);
        let delta2 = new Delta([{insert: 'B'}]);
        
        // Transform with priority = true
        let result = delta1.transform(delta2, true);
        assert(result instanceof Delta);
        assert.deepStrictEqual(result.ops, [{retain: 1}, {insert: 'B'}]);
        done();
    });
});