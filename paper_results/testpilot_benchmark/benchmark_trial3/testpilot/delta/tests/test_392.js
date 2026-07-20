let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.forEach with attributes', function(done) {
        let delta = new quill_delta([
            { insert: 'Bold text', attributes: { bold: true } },
            { insert: 'Normal text' },
            { retain: 5, attributes: { color: 'red' } }
        ]);
        
        let attributeCount = 0;
        delta.forEach(function(op, index) {
            if (op.attributes) {
                attributeCount++;
            }
        });
        
        assert.equal(attributeCount, 2);
        done();
    });
});