let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.reduce with basic operations', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World', attributes: { bold: true } }
        ]);
        
        // Test reducing to concatenate all text
        let result = delta.reduce((acc, op) => {
            if (op.insert && typeof op.insert === 'string') {
                return acc + op.insert;
            }
            return acc;
        }, '');
        
        assert.strictEqual(result, 'Hello World');
        done();
    });
});