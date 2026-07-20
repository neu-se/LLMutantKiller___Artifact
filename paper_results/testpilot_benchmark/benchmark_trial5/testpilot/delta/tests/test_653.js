let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.invert with empty delta', function(done) {
        let base = new quill_delta([{insert: 'Hello'}]);
        let delta = new quill_delta();
        let inverted = delta.invert(base);
        
        // Inverting empty delta should return empty delta
        assert.deepEqual(inverted.ops, []);
        done();
    });
});