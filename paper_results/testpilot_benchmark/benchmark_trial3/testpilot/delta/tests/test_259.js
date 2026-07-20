let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.transform with undefined inputs', function(done) {
        let result = quill_delta.AttributeMap.transform(undefined, { bold: true }, false);
        assert.deepEqual(result, { bold: true });
        done();
    });
});