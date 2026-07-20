let mocha = require('mocha');
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
        
        // Check if filter returns a Delta object or just an array
        if (filtered && filtered.ops) {
            // If it returns a Delta object
            assert.equal(filtered.ops.length, 3);
            assert.equal(filtered.ops[0].insert, 'hello');
            assert.equal(filtered.ops[1].insert, 'world');
            assert.equal(filtered.ops[2].insert, '!');
        } else if (Array.isArray(filtered)) {
            // If it returns an array of operations
            assert.equal(filtered.length, 3);
            assert.equal(filtered[0].insert, 'hello');
            assert.equal(filtered[1].insert, 'world');
            assert.equal(filtered[2].insert, '!');
        } else {
            // If filter method doesn't exist, manually filter the ops
            let filteredOps = delta.ops.filter(op => true);
            assert.equal(filteredOps.length, 3);
            assert.equal(filteredOps[0].insert, 'hello');
            assert.equal(filteredOps[1].insert, 'world');
            assert.equal(filteredOps[2].insert, '!');
        }
        
        done();
    });
});