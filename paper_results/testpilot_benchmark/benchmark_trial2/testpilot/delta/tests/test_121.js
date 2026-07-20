let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.map with empty delta', function(done) {
        let delta = new quill_delta([]);
        
        // Create a new delta by transforming the empty delta
        let mapped = new quill_delta();
        delta.ops.forEach(function(op) {
            mapped.insert('should not appear');
        });
        
        assert.deepEqual(mapped.ops, []);
        done();
    });
});