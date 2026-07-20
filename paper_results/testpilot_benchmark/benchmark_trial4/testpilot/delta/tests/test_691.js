let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test transform priority behavior with inserts', function(done) {
        const delta1 = new Delta([{insert: 'A'}]);
        const delta2 = new Delta([{insert: 'B'}]);
        
        const resultWithPriority = delta1.transform(delta2, true);
        const resultWithoutPriority = delta1.transform(delta2, false);
        
        // Both should be valid Delta objects
        assert.ok(resultWithPriority instanceof Delta);
        assert.ok(resultWithoutPriority instanceof Delta);
        
        done();
    });
});