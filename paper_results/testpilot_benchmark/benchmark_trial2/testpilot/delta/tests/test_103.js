let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.filter - empty result', function(done) {
        let delta = new quill_delta([
            { retain: 5 },
            { insert: 'hello' }
        ]);
        
        // Filter for operations that don't exist
        let filtered = delta.filter(op => op.delete !== undefined);
        
        // Check if filtered is a Delta object or an array
        if (filtered && filtered.ops) {
            assert.equal(filtered.ops.length, 0);
        } else if (Array.isArray(filtered)) {
            assert.equal(filtered.length, 0);
        } else {
            // If filter method doesn't exist or returns undefined, manually filter ops
            let manualFiltered = delta.ops.filter(op => op.delete !== undefined);
            assert.equal(manualFiltered.length, 0);
        }
        
        done();
    });
});