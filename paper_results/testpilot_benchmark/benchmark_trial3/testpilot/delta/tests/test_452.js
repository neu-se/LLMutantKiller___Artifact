let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.reduce with numeric accumulation', function(done) {
        let delta = new quill_delta([
            { retain: 5 },
            { delete: 3 },
            { retain: 2 },
            { delete: 1 }
        ]);
        
        // Test summing delete operations
        let totalDeleted = delta.reduce((acc, op) => {
            return acc + (op.delete || 0);
        }, 0);
        
        assert.strictEqual(totalDeleted, 4);
        done();
    });
});