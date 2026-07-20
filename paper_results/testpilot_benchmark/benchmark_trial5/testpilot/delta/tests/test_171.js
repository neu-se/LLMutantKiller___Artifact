let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.compose - undefined values in a', function(done) {
        const a = { bold: undefined, italic: true };
        const b = { color: 'red' };
        const result = quill_delta.AttributeMap.compose(a, b);
        
        assert.deepEqual(result, { italic: true, color: 'red' });
        done();
    });

    })