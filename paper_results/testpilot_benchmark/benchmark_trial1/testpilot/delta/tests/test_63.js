let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.transform with conflicting attributes and priority false', function(done) {
        let a = { bold: true, color: 'blue' };
        let b = { bold: false, color: 'red' };
        
        let result = quill_delta.AttributeMap.transform(a, b, false);
        
        // With priority false, b should take precedence
        assert.deepEqual(result, { bold: false, color: 'red' });
        done();
    });

    })