let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - non-document delta throws error', function(done) {
        const delta1 = new Delta([{ retain: 5 }]); // Non-document delta
        const delta2 = new Delta([{ insert: 'Hello' }]);
        
        assert.throws(() => {
            delta1.diff(delta2);
        }, /diff\(\) called with non-document/, 'Should throw error for non-document delta');
        done();
    });
});