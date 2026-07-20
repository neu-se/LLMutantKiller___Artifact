let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.filter - returns new Delta instance', function(done) {
        let delta = new quill_delta([
            { insert: 'hello' },
            { retain: 5 }
        ]);
        
        let filtered = delta.filter(op => op.insert !== undefined);
        
        // Should return a new Delta instance
        assert(filtered instanceof quill_delta);
        assert.notEqual(filtered, delta);
        done();
    });
});