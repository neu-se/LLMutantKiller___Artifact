let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.diff - modify attributes', function(done) {
        let a = { bold: true, color: 'red' };
        let b = { bold: false, color: 'blue' };
        let result = quill_delta.AttributeMap.diff(a, b);
        assert.deepEqual(result, { bold: false, color: 'blue' });
        done();
    });

    })