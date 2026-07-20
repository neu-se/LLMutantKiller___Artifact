let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.changeLength - insert with embeds', function(done) {
        let delta = new quill_delta();
        delta.insert({ image: 'url' });
        delta.insert('text');
        let length = delta.changeLength();
        assert.strictEqual(length, 5); // 1 embed + 4 text characters
        done();
    });
});