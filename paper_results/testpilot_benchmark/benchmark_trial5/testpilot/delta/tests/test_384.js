let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.filter - all operations pass', function(done) {
        let delta = new quill_delta([
            { retain: 5 },
            { insert: 'hello' },
            { delete: 3 }
        ]);
        
        // Filter that accepts all operations
        let filtered = delta.filter(op => true);
        
        assert.equal(filtered.ops.length, 3);
        assert.deepEqual(filtered.ops, delta.ops);
        done();
    });

    })