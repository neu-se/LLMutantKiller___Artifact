let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.partition with retain operations', function(done) {
        let delta = new quill_delta([
            { retain: 5 },
            { insert: 'hello' },
            { retain: 3 },
            { delete: 2 }
        ]);
        
        let [retains, others] = delta.partition(op => op.retain);
        
        assert.equal(retains.ops.length, 2);
        assert.equal(retains.ops[0].retain, 5);
        assert.equal(retains.ops[1].retain, 3);
        
        assert.equal(others.ops.length, 2);
        assert.equal(others.ops[0].insert, 'hello');
        assert.equal(others.ops[1].delete, 2);
        
        done();
    });
});