let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.compose - empty deltas', function(done) {
        const delta1 = new quill_delta();
        const delta2 = new quill_delta([{insert: 'Hello'}]);
        const result = delta1.compose(delta2);
        
        assert.deepEqual(result.ops, [{insert: 'Hello'}]);
        done();
    });

    })