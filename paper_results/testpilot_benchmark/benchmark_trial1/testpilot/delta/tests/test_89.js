let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.filter - basic filtering', function(done) {
        let delta = new quill_delta([
            { retain: 5 },
            { insert: 'hello' },
            { delete: 3 },
            { insert: 'world', attributes: { bold: true } }
        ]);
        
        // Filter only insert operations
        let filtered = delta.filter(op => op.insert !== undefined);
        
        assert.equal(filtered.ops.length, 2);
        assert.equal(filtered.ops[0].insert, 'hello');
        assert.equal(filtered.ops[1].insert, 'world');
        done();
    });

    })