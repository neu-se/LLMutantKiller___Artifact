let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should create delta with ops array', function(done) {
        const ops = [{ insert: 'hello' }, { insert: ' world' }];
        const delta = new quill_delta(ops);
        assert.deepEqual(delta.ops, ops);
        done();
    });

    })