let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.chop - keeps trailing retain with attributes', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello' },
            { retain: 5, attributes: { bold: true } }
        ]);
        
        delta.chop();
        
        assert.deepEqual(delta.ops, [
            { insert: 'Hello' },
            { retain: 5, attributes: { bold: true } }
        ]);
        done();
    });
});