let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.compose - first map empty', function(done) {
        let b = { bold: true, color: 'red' };
        let result = quill_delta.AttributeMap.compose({}, b);
        
        assert.deepEqual(result, { bold: true, color: 'red' });
        done();
    });

    })