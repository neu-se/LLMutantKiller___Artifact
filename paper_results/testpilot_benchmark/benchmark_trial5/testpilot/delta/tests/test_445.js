let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.partition where no operations pass predicate', function(done) {
        const delta = new quill_delta([
            { delete: 1 },
            { retain: 2 },
            { delete: 3 }
        ]);
        
        const [passed, failed] = delta.partition(op => op.insert);
        
        assert.equal(passed.length, 0);
        assert.equal(failed.length, 3);
        assert.deepEqual(failed[0], { delete: 1 });
        assert.deepEqual(failed[1], { retain: 2 });
        assert.deepEqual(failed[2], { delete: 3 });
        done();
    });
});