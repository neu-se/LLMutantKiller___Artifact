let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose - empty deltas', function(done) {
        let delta1 = new quill_delta();
        let delta2 = new quill_delta([
            { insert: 'Hello' }
        ]);
        
        let result = delta1.compose(delta2);
        let expected = new quill_delta([
            { insert: 'Hello' }
        ]);
        
        assert.deepEqual(result.ops, expected.ops);
        done();
    });
});