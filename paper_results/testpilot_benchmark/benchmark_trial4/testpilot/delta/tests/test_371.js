let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.chop - returns this for chaining', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello' },
            { retain: 5 }
        ]);
        
        let result = delta.chop();
        
        assert.strictEqual(result, delta);
        done();
    });
});