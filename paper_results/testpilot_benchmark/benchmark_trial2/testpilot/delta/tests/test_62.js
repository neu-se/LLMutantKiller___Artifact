let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.transform with conflicting attributes and priority false', function(done) {
        let a = { bold: true, color: 'red' };
        let b = { bold: false, color: 'blue' };
        let result = quill_delta.AttributeMap.transform(a, b, false);
        
        // When priority is false, a's attributes should take precedence
        assert.deepEqual(result, { bold: true, color: 'red' });
        done();
    });

    })