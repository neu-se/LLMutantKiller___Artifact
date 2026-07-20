let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.length - insert with delete operations', function(done) {
        let delta = new quill_delta();
        delta.insert('Hello World');
        delta.delete(6);
        assert.strictEqual(delta.length(), 11);
        done();
    });

    })