let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.concat with empty delta', function(done) {
        const delta1 = new quill_delta([{insert: 'Hello'}]);
        const delta2 = new quill_delta();
        
        const result = delta1.concat(delta2);
        
        assert.deepEqual(result.ops, [{insert: 'Hello'}]);
        assert.notStrictEqual(result, delta1); // Should return new instance
        done();
    });
});