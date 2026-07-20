let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.invert - attr only', function(done) {
        // Test with only attr provided
        let attr = { bold: true, color: 'red' };
        let result = quill_delta.AttributeMap.invert(attr, {});
        
        // Should return attributes that would undo the changes
        assert.deepEqual(result, { bold: null, color: null });
        done();
    });

    })