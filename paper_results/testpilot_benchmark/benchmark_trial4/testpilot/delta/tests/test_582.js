let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.concat - concatenating to empty delta', function(done) {
        let emptyDelta = new quill_delta();
        let delta2 = new quill_delta([
            { insert: 'World' }
        ]);
        
        let result = emptyDelta.concat(delta2);
        
        assert.equal(result.ops.length, 1);
        assert.equal(result.ops[0].insert, 'World');
        done();
    });
});