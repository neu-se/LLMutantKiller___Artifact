let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test suite', function() {
    it('test case', function(done) {
        const delta3 = new quill_delta().insert('A').retain(2).delete(1);
assert.equal(delta3.length(), 4);
    })
})