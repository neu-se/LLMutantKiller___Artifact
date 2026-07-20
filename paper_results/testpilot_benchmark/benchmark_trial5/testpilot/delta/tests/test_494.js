let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.length - single insert operation', function(done) {
        let delta = new quill_delta();
        delta.insert('Hello');
        assert.strictEqual(delta.length(), 5);
        done();
    });

    })