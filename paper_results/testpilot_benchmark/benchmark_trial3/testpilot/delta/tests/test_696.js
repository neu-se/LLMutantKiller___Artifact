let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test transform with delete operations', function(done) {
        let delta1 = new Delta([{delete: 3}]);
        let delta2 = new Delta([{retain: 2}, {insert: 'X'}]);
        
        let result = delta1.transform(delta2);
        assert(result instanceof Delta);
        // Delete operations should make other operations continue without adding to result
        assert.deepStrictEqual(result.ops, [{insert: 'X'}]);
        done();
    });
});