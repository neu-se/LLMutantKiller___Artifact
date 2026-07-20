let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.changeLength - empty delta', function(done) {
        let delta = new quill_delta();
        let length = delta.changeLength();
        assert.strictEqual(length, 0);
        done();
    });

    })