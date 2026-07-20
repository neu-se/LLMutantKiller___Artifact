let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.concat - empty delta concatenation', function(done) {
        let delta1 = new quill_delta([
            { insert: 'Hello' }
        ]);
        let emptyDelta = new quill_delta();
        
        let result = delta1.concat(emptyDelta);
        
        assert.equal(result.ops.length, 1);
        assert.equal(result.ops[0].insert, 'Hello');
        done();
    });
});