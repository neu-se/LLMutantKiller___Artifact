let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.length - insert and delete operations', function(done) {
        let delta = new quill_delta();
        delta.insert('hello');
        delta.delete(2);
        assert.strictEqual(delta.length(), 7);
        done();
    });

    })