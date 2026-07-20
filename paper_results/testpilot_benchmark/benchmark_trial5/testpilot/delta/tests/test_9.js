let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should create empty delta when no ops provided', function(done) {
        const delta = new quill_delta();
        assert.deepEqual(delta.ops, []);
        done();
    });

    })