let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.length - insert with embeds', function(done) {
        let delta = new quill_delta();
        delta.insert('text');
        delta.insert({ image: 'url' }); // embed counts as length 1
        delta.insert('more');
        assert.strictEqual(delta.length(), 9);
        done();
    });
});