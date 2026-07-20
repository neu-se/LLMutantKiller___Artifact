let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should retain text with attributes', function(done) {
        let delta = new Delta();
        delta.retain(5, { italic: true });
        assert.strictEqual(delta.ops.length, 1);
        assert.strictEqual(delta.ops[0].retain, 5);
        assert.deepStrictEqual(delta.ops[0].attributes, { italic: true });
        done();
    });

    })