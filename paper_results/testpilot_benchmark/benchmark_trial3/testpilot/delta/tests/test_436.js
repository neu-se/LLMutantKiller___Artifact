let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.partition where all operations fail', function(done) {
        const delta = new quill_delta([
            { insert: 'A' },
            { insert: 'B' },
            { insert: 'C' }
        ]);
        
        const [passed, failed] = delta.partition(op => op.delete);
        
        assert.equal(passed.length, 0);
        assert.equal(failed.length, 3);
        assert.deepEqual(failed, [
            { insert: 'A' },
            { insert: 'B' },
            { insert: 'C' }
        ]);
        done();
    });
});