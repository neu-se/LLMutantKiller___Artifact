let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.partition with mixed operations', function(done) {
        const delta = new quill_delta([
            { insert: 'Hello' },
            { delete: 5 },
            { retain: 3 },
            { insert: 'World' }
        ]);
        
        const [insertOps, otherOps] = delta.partition(op => op.insert !== undefined);
        
        assert.equal(insertOps.length, 2);
        assert.equal(otherOps.length, 2);
        assert.deepEqual(insertOps[0], { insert: 'Hello' });
        assert.deepEqual(insertOps[1], { insert: 'World' });
        assert.deepEqual(otherOps[0], { delete: 5 });
        assert.deepEqual(otherOps[1], { retain: 3 });
        done();
    });
});