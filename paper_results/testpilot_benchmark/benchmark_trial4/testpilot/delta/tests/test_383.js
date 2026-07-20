let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.filter - filter retain operations', function(done) {
        let delta = new quill_delta([
            { retain: 5 },
            { insert: 'hello' },
            { retain: 10, attributes: { italic: true } },
            { delete: 3 }
        ]);
        
        // Filter only retain operations
        let filtered = delta.filter(op => op.retain !== undefined);
        
        assert.equal(filtered.ops.length, 2);
        assert.equal(filtered.ops[0].retain, 5);
        assert.equal(filtered.ops[1].retain, 10);
        assert.deepEqual(filtered.ops[1].attributes, { italic: true });
        done();
    });

    })