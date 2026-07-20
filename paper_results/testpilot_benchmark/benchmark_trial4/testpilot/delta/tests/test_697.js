let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test transform with retain operations', function(done) {
        const delta1 = new Delta([{retain: 5}]);
        const delta2 = new Delta([{retain: 3}, {insert: 'test'}]);
        
        const result = delta1.transform(delta2);
        assert.ok(result instanceof Delta);
        assert.ok(Array.isArray(result.ops));
        
        done();
    });
});