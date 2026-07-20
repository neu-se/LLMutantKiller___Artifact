let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.concat preserves original deltas', function(done) {
        const delta1 = new quill_delta([{insert: 'Original'}]);
        const delta2 = new quill_delta([{insert: ' Text'}]);
        const originalDelta1Ops = JSON.parse(JSON.stringify(delta1.ops));
        const originalDelta2Ops = JSON.parse(JSON.stringify(delta2.ops));
        
        const result = delta1.concat(delta2);
        
        // Original deltas should remain unchanged
        assert.deepEqual(delta1.ops, originalDelta1Ops);
        assert.deepEqual(delta2.ops, originalDelta2Ops);
        done();
    });

    })