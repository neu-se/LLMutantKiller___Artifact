let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.diff - non-text inserts', function(done) {
        const delta1 = new Delta([{ insert: { image: 'url1' } }]);
        const delta2 = new Delta([{ insert: { image: 'url2' } }]);
        
        const result = delta1.diff(delta2);
        
        // Non-text inserts are treated as single characters
        assert.deepEqual(result.ops, [
            { insert: { image: 'url2' } },
            { delete: 1 }
        ]);
        done();
    });

    })