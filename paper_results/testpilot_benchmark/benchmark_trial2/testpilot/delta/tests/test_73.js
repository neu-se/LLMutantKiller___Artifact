let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.transform with basic attributes', function(done) {
        let a = { bold: true, italic: true };
        let b = { underline: true };
        let result = quill_delta.AttributeMap.transform(a, b, true);
        
        // When priority is true, a's attributes should be preserved and merged with b's
        assert.deepEqual(result, { bold: true, italic: true, underline: true });
        done();
    });
});