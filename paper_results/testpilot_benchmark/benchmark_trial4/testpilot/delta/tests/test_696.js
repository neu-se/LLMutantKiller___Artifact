let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test transform with mixed operations', function(done) {
        const delta1 = new Delta([
            {insert: 'Hello'},
            {retain: 3},
            {delete: 2}
        ]);
        const delta2 = new Delta([
            {retain: 2},
            {insert: ' World'},
            {delete: 1}
        ]);
        
        const result = delta1.transform(delta2, false);
        assert.ok(result instanceof Delta);
        
        done();
    });
});