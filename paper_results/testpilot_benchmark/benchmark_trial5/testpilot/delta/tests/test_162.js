let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.compose - with null values and keepNull false', function(done) {
        let a = { bold: true, italic: true };
        let b = { italic: null, underline: true };
        let result = quill_delta.AttributeMap.compose(a, b, false);
        
        assert.deepEqual(result, { bold: true, underline: true });
        done();
    });

    })