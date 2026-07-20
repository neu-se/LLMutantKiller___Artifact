let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should calculate length', function(done) {
        let delta = new Delta()
            .insert('Hello')
            .insert(' World', { bold: true })
            .delete(2);
        assert.strictEqual(delta.length(), 11);
        done();
    });
});