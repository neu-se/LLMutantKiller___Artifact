let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.push - merge consecutive retain operations with attributes', function(done) {
        let delta = new quill_delta([{ retain: 5, attributes: { bold: true } }]);
        delta.push({ retain: 3, attributes: { bold: true } });
        assert.deepEqual(delta.ops, [{ retain: 8, attributes: { bold: true } }]);
        done();
    });
});