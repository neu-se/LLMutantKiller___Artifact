let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.diff - changed attributes', function(done) {
        const a = { bold: true, color: 'red' };
        const b = { bold: false, color: 'blue' };
        const result = quill_delta.AttributeMap.diff(a, b);
        assert.deepStrictEqual(result, { bold: false, color: 'blue' });
        done();
    });

    })