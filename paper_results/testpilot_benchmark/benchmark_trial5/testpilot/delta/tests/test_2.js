let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should insert text', function(done) {
        let delta = new Delta();
        delta.insert('Hello World');
        assert.strictEqual(delta.ops.length, 1);
        assert.strictEqual(delta.ops[0].insert, 'Hello World');
        done();
    });

    })