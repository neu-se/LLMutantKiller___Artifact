let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.length - insert embeds', function(done) {
        let delta = new quill_delta();
        delta.insert({ image: 'url' });
        delta.insert('Text');
        assert.strictEqual(delta.length(), 5);
        done();
    });
});