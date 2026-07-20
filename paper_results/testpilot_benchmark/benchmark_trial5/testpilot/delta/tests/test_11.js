let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should create delta from another delta object', function(done) {
        const ops = [{ insert: 'test' }];
        const originalDelta = new quill_delta(ops);
        const newDelta = new quill_delta(originalDelta);
        assert.deepEqual(newDelta.ops, ops);
        done();
    });

    })