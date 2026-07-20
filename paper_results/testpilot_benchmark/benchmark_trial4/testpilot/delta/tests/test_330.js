let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.push - should handle operation with attributes', function(done) {
        let delta = new Delta();
        let insertOpWithAttrs = { insert: 'Bold text', attributes: { bold: true } };
        
        delta.push(insertOpWithAttrs);
        
        assert.equal(delta.ops.length, 1);
        assert.deepEqual(delta.ops[0], insertOpWithAttrs);
        assert.equal(delta.ops[0].attributes.bold, true);
        done();
    });

    })