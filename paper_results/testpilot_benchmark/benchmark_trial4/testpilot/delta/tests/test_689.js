let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test transform with empty deltas', function(done) {
        const delta1 = new Delta();
        const delta2 = new Delta([{insert: 'test'}]);
        
        const result = delta1.transform(delta2);
        assert.ok(result instanceof Delta);
        assert.strictEqual(result.ops.length, 1);
        assert.strictEqual(result.ops[0].insert, 'test');
        
        done();
    });

    })