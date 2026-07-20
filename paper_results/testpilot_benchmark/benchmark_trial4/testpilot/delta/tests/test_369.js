let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.chop - keeps retain with zero value but no attributes', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello' },
            { retain: 0 }
        ]);
        
        delta.chop();
        
        assert.deepEqual(delta.ops, [{ insert: 'Hello' }]);
        done();
    });
});