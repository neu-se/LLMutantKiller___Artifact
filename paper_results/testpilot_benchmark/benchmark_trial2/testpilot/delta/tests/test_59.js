let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test suite', function() {
    it('test case', function(done) {
        let result3 = quill_delta.AttributeMap.invert({}, { bold: true, italic: true });
    })
})