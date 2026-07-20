let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transform with empty delta', function(done) {
        // Test transforming with empty delta
        let delta1 = new quill_delta([{insert: 'Hello'}]);
        let delta2 = new quill_delta([]);
        
        let result = delta1.transform(delta2, false);
        assert(result instanceof quill_delta, 'Should return a Delta instance');
        assert.deepEqual(result.ops, [], 'Should return empty ops for empty delta');
        done();
    });

    })