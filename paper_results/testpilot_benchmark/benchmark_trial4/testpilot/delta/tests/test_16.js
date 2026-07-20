let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should not delete zero or negative length', function(done) {
        let delta = new quill_delta();
        delta.delete(0);
        delta.delete(-1);
        assert.deepEqual(delta.ops, []);
        done();
    });

    })