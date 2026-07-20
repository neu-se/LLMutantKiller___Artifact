let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.compose - basic composition', function(done) {
        let a = { bold: true, color: 'red' };
        let b = { italic: true, color: 'blue' };
        let result = quill_delta.AttributeMap.compose(a, b);
        
        assert.deepEqual(result, { bold: true, italic: true, color: 'blue' });
        done();
    });

    })