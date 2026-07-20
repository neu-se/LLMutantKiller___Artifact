let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.length - insert with retain operations', function(done) {
        let delta = new quill_delta();
        delta.retain(3);
        delta.insert('abc');
        delta.retain(2);
        assert.strictEqual(delta.length(), 8);
        done();
    });

    })