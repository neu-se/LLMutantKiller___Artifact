let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.compose - empty objects', function(done) {
        const result = quill_delta.AttributeMap.compose({}, {});
        assert.equal(result, undefined);
        done();
    });

    })