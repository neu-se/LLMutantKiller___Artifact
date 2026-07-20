let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.diff - no changes', function(done) {
        let a = { bold: true, italic: false };
        let b = { bold: true, italic: false };
        
        // Create Delta instances and use the diff method
        let deltaA = new Delta().insert('text', a);
        let deltaB = new Delta().insert('text', b);
        let result = deltaA.diff(deltaB);
        
        // Since there are no changes, the diff should be empty
        assert.deepEqual(result.ops, []);
        done();
    });
});