let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - error on non-document delta', function(done) {
        const delta1 = new Delta([{ retain: 5 }]); // This is not a document delta
        const delta2 = new Delta([{ insert: 'Hello' }]);
        
        assert.throws(() => {
            delta1.diff(delta2);
        }, /diff\(\) called with non-document/);
        done();
    });
});