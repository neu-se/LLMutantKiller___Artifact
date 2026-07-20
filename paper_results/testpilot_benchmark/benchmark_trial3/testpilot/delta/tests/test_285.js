let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.insert with text only', function(done) {
        let delta = new quill_delta();
        let result = delta.insert('Hello World');
        
        assert.strictEqual(result.ops.length, 1);
        assert.strictEqual(result.ops[0].insert, 'Hello World');
        assert.strictEqual(result.ops[0].attributes, undefined);
        done();
    });
});