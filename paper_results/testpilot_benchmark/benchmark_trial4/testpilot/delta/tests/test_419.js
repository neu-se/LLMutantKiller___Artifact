let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.forEach with insert operations', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello' },
            { insert: ' World', attributes: { bold: true } },
            { insert: '\n' }
        ]);
        
        let operations = [];
        delta.forEach(function(op, index) {
            operations.push({ op: op, index: index });
        });
        
        assert.equal(operations.length, 3);
        assert.equal(operations[0].op.insert, 'Hello');
        assert.equal(operations[0].index, 0);
        assert.equal(operations[1].op.insert, ' World');
        assert.equal(operations[1].index, 1);
        assert.deepEqual(operations[1].op.attributes, { bold: true });
        assert.equal(operations[2].op.insert, '\n');
        assert.equal(operations[2].index, 2);
        done();
    });
});