let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.length - complex operations', function(done) {
        let delta = new quill_delta();
        delta.retain(3);
        delta.insert('Test');
        delta.delete(2);
        delta.insert(' String');
        assert.strictEqual(delta.length(), 14);
        done();
    });

    })