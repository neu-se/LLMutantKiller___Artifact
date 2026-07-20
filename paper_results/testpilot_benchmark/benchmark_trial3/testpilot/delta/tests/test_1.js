let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should create delta with insert operations', function(done) {
        let ops = [
            { insert: 'Hello' },
            { insert: ' World', attributes: { bold: true } }
        ];
        let delta = new Delta(ops);
        assert.strictEqual(delta.ops.length, 2);
        assert.strictEqual(delta.ops[0].insert, 'Hello');
        assert.strictEqual(delta.ops[1].insert, ' World');
        assert.deepStrictEqual(delta.ops[1].attributes, { bold: true });
        done();
    });

    })