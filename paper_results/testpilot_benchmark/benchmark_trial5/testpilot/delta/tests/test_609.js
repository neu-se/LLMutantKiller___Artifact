let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - identical deltas', function(done) {
        const delta1 = new Delta([{ insert: 'Hello World' }]);
        const delta2 = new Delta([{ insert: 'Hello World' }]);
        
        const result = delta1.diff(delta2);
        
        assert.deepEqual(result.ops, []);
        done();
    });
});