let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should create delta with retain operations', function(done) {
        let ops = [
            { retain: 5 },
            { insert: 'text' }
        ];
        let delta = new Delta(ops);
        assert.strictEqual(delta.ops.length, 2);
        assert.strictEqual(delta.ops[0].retain, 5);
        assert.strictEqual(delta.ops[1].insert, 'text');
        done();
    });

    })