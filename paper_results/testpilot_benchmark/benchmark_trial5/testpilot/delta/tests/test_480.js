let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.changeLength - retain operations', function(done) {
        let delta = new quill_delta();
        delta.retain(5);
        delta.retain(3);
        let length = delta.changeLength();
        assert.strictEqual(length, 0); // retain operations don't change length
        done();
    });

    })