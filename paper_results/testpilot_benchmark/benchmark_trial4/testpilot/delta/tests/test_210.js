let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.AttributeMap.diff - non-object inputs', function(done) {
        const result1 = quill_delta.AttributeMap.diff('string', { bold: true });
        assert.deepStrictEqual(result1, { bold: true });
        
        const result2 = quill_delta.AttributeMap.diff({ bold: true }, null);
        assert.deepStrictEqual(result2, { bold: null });
        
        const result3 = quill_delta.AttributeMap.diff(123, 456);
        assert.strictEqual(result3, undefined);
        done();
    });
});