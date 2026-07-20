let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - empty attributes', function(done) {
        // Test with empty attr object
        let attr = {};
        let base = { bold: true, italic: false };
        let result = quill_delta.AttributeMap.invert(attr, base);
        
        assert.deepEqual(result, {});
        done();
    });

    })