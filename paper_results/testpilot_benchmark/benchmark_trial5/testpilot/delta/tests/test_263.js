let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.transform with both empty objects', function(done) {
        let a = {};
        let b = {};
        
        let result = quill_delta.AttributeMap.transform(a, b, false);
        
        assert.deepEqual(result, {});
        done();
    });
});