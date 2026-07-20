let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.push - clones the input operation', function(done) {
        let delta = new quill_delta();
        let op = { insert: 'hello', attributes: { bold: true } };
        delta.push(op);
        
        // Modify original operation
        op.insert = 'modified';
        op.attributes.bold = false;
        
        // Delta should contain the original values
        assert.deepEqual(delta.ops, [{ insert: 'hello', attributes: { bold: true } }]);
        done();
    });
});