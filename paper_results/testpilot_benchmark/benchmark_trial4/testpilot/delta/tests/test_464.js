let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.reduce with sum operation', function(done) {
        // Create a delta with retain and insert operations
        let delta = new quill_delta([
            { retain: 5 },
            { insert: 'hello' },
            { retain: 3 }
        ]);
        
        // Test reduce to sum all retain values
        let totalRetain = delta.reduce((acc, op) => {
            if (op.retain) {
                return acc + op.retain;
            }
            return acc;
        }, 0);
        
        assert.strictEqual(totalRetain, 8);
        done();
    });

    })