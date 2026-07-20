let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.changeLength - delete operations', function(done) {
        let delta = new quill_delta();
        delta.delete(3);
        delta.delete(2);
        let length = delta.changeLength();
        assert.strictEqual(length, -5); // 5 characters deleted
        done();
    });

    })