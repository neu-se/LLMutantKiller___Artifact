let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.compose - second map empty', function(done) {
        let a = { bold: true, color: 'blue' };
        let result = quill_delta.AttributeMap.compose(a, {});
        
        assert.deepEqual(result, { bold: true, color: 'blue' });
        done();
    });

    })