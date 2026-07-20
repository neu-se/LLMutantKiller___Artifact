let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.reduce with mixed operations', function(done) {
        // Create a delta with mixed operations
        let delta = new quill_delta([
            { retain: 2 },
            { insert: 'test' },
            { delete: 1 },
            { retain: 3 }
        ]);
        
        // Test reduce to count total operations
        let opCount = delta.reduce((acc, op) => {
            return acc + 1;
        }, 0);
        
        assert.strictEqual(opCount, 4);
        done();
    });

    })