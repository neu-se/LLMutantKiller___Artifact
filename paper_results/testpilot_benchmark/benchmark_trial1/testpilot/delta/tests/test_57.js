let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - basic inversion', function(done) {
        // Test basic attribute inversion
        let attr = { bold: true, italic: false };
        let base = { bold: false, italic: true };
        let result = quill_delta.AttributeMap.invert(attr, base);
        
        assert.deepEqual(result, { bold: false, italic: true });
        done();
    });

    })