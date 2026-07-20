let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transform with insert operations', function(done) {
        // Test transforming with insert operations
        let delta1 = new quill_delta([{insert: 'Hello'}]);
        let delta2 = new quill_delta([{insert: 'World'}]);
        
        let result = delta1.transform(delta2, false);
        assert(result instanceof quill_delta, 'Should return a Delta instance');
        assert.deepEqual(result.ops, [{insert: 'World'}], 'Should include other delta insert operations');
        done();
    });

    })