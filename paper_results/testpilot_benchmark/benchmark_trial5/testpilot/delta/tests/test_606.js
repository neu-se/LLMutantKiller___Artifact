let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - text replacement', function(done) {
        const delta1 = new Delta([{ insert: 'Hello World' }]);
        const delta2 = new Delta([{ insert: 'Hello Universe' }]);
        
        const result = delta1.diff(delta2);
        
        assert.deepEqual(result.ops, [
            { retain: 6 },
            { insert: 'Universe' },
            { delete: 5 }
        ]);
        done();
    });
});