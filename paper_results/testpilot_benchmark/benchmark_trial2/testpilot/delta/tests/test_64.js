let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.transform with null attributes', function(done) {
        let a = { bold: true, italic: null };
        let b = { underline: true, italic: true };
        let result = quill_delta.AttributeMap.transform(a, b, false);
        
        // null values should remove attributes
        assert.deepEqual(result, { bold: true, underline: true, italic: null });
        done();
    });

    })