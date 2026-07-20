let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.filter - filter by attributes', function(done) {
        let delta = new quill_delta([
            { insert: 'plain text' },
            { insert: 'bold text', attributes: { bold: true } },
            { insert: 'italic text', attributes: { italic: true } },
            { retain: 5 }
        ]);
        
        // Filter operations with attributes
        let filtered = delta.filter(op => op.attributes !== undefined);
        
        assert.equal(filtered.ops.length, 2);
        assert.equal(filtered.ops[0].insert, 'bold text');
        assert.equal(filtered.ops[1].insert, 'italic text');
        done();
    });

    })