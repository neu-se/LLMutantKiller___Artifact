let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.forEach with mixed operations', function(done) {
        let delta = new quill_delta([
            { insert: 'Hello' },
            { delete: 5 },
            { retain: 3, attributes: { italic: true } },
            { insert: 'World' }
        ]);
        
        let operationTypes = [];
        delta.forEach(function(op, index) {
            if (op.insert !== undefined) operationTypes.push('insert');
            else if (op.delete !== undefined) operationTypes.push('delete');
            else if (op.retain !== undefined) operationTypes.push('retain');
        });
        
        assert.deepEqual(operationTypes, ['insert', 'delete', 'retain', 'insert']);
        done();
    });
});