let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('should not chop retain with attributes', function(done) {
        const delta = new quill_delta();
        delta.insert('hello');
        delta.retain(5, { bold: true });
        delta.chop();
        assert.deepEqual(delta.ops, [{ insert: 'hello' }, { retain: 5, attributes: { bold: true } }]);
        done();
    });
});