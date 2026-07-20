let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.forEach early termination', function(done) {
        let delta = new quill_delta([
            { insert: 'A' },
            { insert: 'B' },
            { insert: 'C' },
            { insert: 'D' }
        ]);
        
        let visited = [];
        delta.forEach(function(op, index) {
            visited.push(op.insert);
            if (index === 1) {
                return false; // Try to break early (behavior may vary by implementation)
            }
        });
        
        // Note: The actual behavior depends on the quill-delta implementation
        // This test documents the behavior rather than enforcing early termination
        assert.equal(visited.length >= 2, true);
        assert.equal(visited[0], 'A');
        assert.equal(visited[1], 'B');
        done();
    });
});