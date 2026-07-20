let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.length - complex operations', function(done) {
        let delta = new quill_delta();
        delta.retain(5);
        delta.insert('test');
        delta.delete(3);
        delta.insert(' string');
        delta.retain(1);
        assert.strictEqual(delta.length(), 17);
        done();
    });

    })