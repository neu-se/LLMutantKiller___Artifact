let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should delete text', function(done) {
        let delta = new Delta();
        delta.delete(5);
        assert.strictEqual(delta.ops.length, 1);
        assert.strictEqual(delta.ops[0].delete, 5);
        done();
    });

    })