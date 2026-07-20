let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.map with retain operations', function(done) {
        let delta = new quill_delta([
            { retain: 5 },
            { insert: 'new text' },
            { retain: 3 }
        ]);
        
        // Create a new delta with mapped operations
        let mappedOps = delta.ops.map(function(op) {
            if (op.retain) {
                return { retain: op.retain * 2 };
            }
            return op;
        });
        
        let mapped = new quill_delta(mappedOps);
        
        assert.deepEqual(mapped.ops, [
            { retain: 10 },
            { insert: 'new text' },
            { retain: 6 }
        ]);
        done();
    });
});