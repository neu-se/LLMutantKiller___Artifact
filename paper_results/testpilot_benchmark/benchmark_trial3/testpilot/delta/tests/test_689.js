let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test transform priority parameter coercion', function(done) {
        let delta1 = new Delta([{insert: 'A'}]);
        let delta2 = new Delta([{insert: 'B'}]);
        
        // Test with truthy value
        let result1 = delta1.transform(delta2, 1);
        assert.deepStrictEqual(result1.ops, [{retain: 1}, {insert: 'B'}]);
        
        // Test with falsy value
        let result2 = delta1.transform(delta2, 0);
        assert.deepStrictEqual(result2.ops, [{insert: 'B'}]);
        
        done();
    });
});