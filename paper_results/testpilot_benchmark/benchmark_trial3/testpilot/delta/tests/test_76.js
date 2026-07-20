let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator edge cases', function(done) {
        // Test with undefined/null
        let nullIterator = new quill_delta.OpIterator(null);
        assert.strictEqual(nullIterator.hasNext(), false);
        
        // Test with operations containing null/undefined values
        let opsWithNulls = [
            { insert: '' },
            { retain: 0 }
        ];
        let nullOpsIterator = new quill_delta.OpIterator(opsWithNulls);
        
        if (nullOpsIterator.hasNext()) {
            let emptyInsert = nullOpsIterator.next();
            assert.strictEqual(emptyInsert.insert, '');
        }
        
        done();
    });
});