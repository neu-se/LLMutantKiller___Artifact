let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test transform with insert operations and priority', function(done) {
        const delta1 = new Delta([{insert: 'A'}]);
        const delta2 = new Delta([{insert: 'B'}]);
        
        // Transform with priority = true
        const result1 = delta1.transform(delta2, true);
        assert.ok(result1 instanceof Delta);
        
        // Transform with priority = false
        const result2 = delta1.transform(delta2, false);
        assert.ok(result2 instanceof Delta);
        
        done();
    });
});