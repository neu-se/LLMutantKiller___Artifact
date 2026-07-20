let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transform with number argument', function(done) {
        // Test transformPosition functionality
        let delta = new Delta([{insert: 'hello'}, {insert: ' world'}]);
        let result = delta.transform(3, false);
        assert.strictEqual(typeof result, 'number');
        done();
    });
});