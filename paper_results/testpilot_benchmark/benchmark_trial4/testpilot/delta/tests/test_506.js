let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.length - mixed operations', function(done) {
        let delta = new quill_delta();
        delta.retain(5);
        delta.insert('test');
        delta.delete(3);
        delta.insert('ing');
        assert.strictEqual(delta.length(), 15);
        done();
    });

    })