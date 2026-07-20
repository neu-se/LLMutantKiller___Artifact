let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - same reference returns empty delta', function(done) {
        const delta = new Delta([{ insert: 'Hello World' }]);
        
        const result = delta.diff(delta);
        
        assert.strictEqual(result.ops.length, 0, 'Diff of same reference should be empty');
        done();
    });
});