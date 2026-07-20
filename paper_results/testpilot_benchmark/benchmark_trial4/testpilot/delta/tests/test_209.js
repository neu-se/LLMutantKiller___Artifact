let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.diff - mixed changes', function(done) {
        const a = { bold: true, italic: true, color: 'red' };
        const b = { bold: false, underline: true };
        const result = quill_delta.AttributeMap.diff(a, b);
        assert.deepStrictEqual(result, { 
            bold: false, 
            italic: null, 
            color: null, 
            underline: true 
        });
        done();
    });

    })