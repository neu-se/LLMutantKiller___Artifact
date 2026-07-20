let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test transform with empty delta', function(done) {
        let delta1 = new Delta();
        let delta2 = new Delta([{insert: 'test'}]);
        
        let result = delta1.transform(delta2);
        assert(result instanceof Delta);
        assert.deepStrictEqual(result.ops, [{insert: 'test'}]);
        done();
    });

    })