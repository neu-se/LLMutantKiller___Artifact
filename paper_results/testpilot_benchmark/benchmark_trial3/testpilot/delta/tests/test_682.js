let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test transform with insert operations without priority', function(done) {
        let delta1 = new Delta([{insert: 'A'}]);
        let delta2 = new Delta([{insert: 'B'}]);
        
        // Transform with priority = false (default)
        let result = delta1.transform(delta2, false);
        assert(result instanceof Delta);
        assert.deepStrictEqual(result.ops, [{insert: 'B'}]);
        done();
    });

    })