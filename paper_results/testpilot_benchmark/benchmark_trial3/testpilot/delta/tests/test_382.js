let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.filter - all operations pass', function(done) {
        let delta = new quill_delta([
            { insert: 'hello' },
            { insert: 'world' },
            { insert: '!' }
        ]);
        
        // Filter that accepts all operations
        let filtered = delta.filter(op => true);
        
        assert.equal(filtered.ops.length, 3);
        assert.equal(filtered.ops[0].insert, 'hello');
        assert.equal(filtered.ops[1].insert, 'world');
        assert.equal(filtered.ops[2].insert, '!');
        done();
    });
});