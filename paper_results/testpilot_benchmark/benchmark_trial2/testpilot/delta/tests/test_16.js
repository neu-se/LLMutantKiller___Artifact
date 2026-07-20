let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.next', function(done) {
        // Test 1: next() without length parameter (should use Infinity)
        let ops1 = [{ insert: 'hello' }, { retain: 5 }];
        let iterator1 = new quill_delta.OpIterator(ops1);
        let result1 = iterator1.next();
        assert.deepEqual(result1, { insert: 'hello' });
        
        // Test 2: next() with specific length on insert operation
        let ops2 = [{ insert: 'hello world' }];
        let iterator2 = new quill_delta.OpIterator(ops2);
        let result2 = iterator2.next(5);
        assert.deepEqual(result2, { insert: 'hello' });
        
        // Test 3: next() with length greater than remaining operation length
        let ops3 = [{ insert: 'hi' }];
        let iterator3 = new quill_delta.OpIterator(ops3);
        let result3 = iterator3.next(10);
        assert.deepEqual(result3, { insert: 'hi' });
        
        // Test 4: next() on retain operation
        let ops4 = [{ retain: 10 }];
        let iterator4 = new quill_delta.OpIterator(ops4);
        let result4 = iterator4.next(5);
        assert.deepEqual(result4, { retain: 5 });
        
        // Test 5: next() on delete operation
        let ops5 = [{ delete: 8 }];
        let iterator5 = new quill_delta.OpIterator(ops5);
        let result5 = iterator5.next(3);
        assert.deepEqual(result5, { delete: 3 });
        
        // Test 6: next() with attributes
        let ops6 = [{ insert: 'text', attributes: { bold: true } }];
        let iterator6 = new quill_delta.OpIterator(ops6);
        let result6 = iterator6.next(2);
        assert.deepEqual(result6, { insert: 'te', attributes: { bold: true } });
        
        // Test 7: next() when no more operations (should return retain: Infinity)
        let ops7 = [{ insert: 'test' }];
        let iterator7 = new quill_delta.OpIterator(ops7);
        iterator7.next(); // consume the operation
        let result7 = iterator7.next();
        assert.deepEqual(result7, { retain: Infinity });
        
        // Test 8: next() on retain object (embed)
        let ops8 = [{ retain: { image: 'url' } }];
        let iterator8 = new quill_delta.OpIterator(ops8);
        let result8 = iterator8.next(1);
        assert.deepEqual(result8, { retain: { image: 'url' } });
        
        // Test 9: next() on insert object (embed)
        let ops9 = [{ insert: { image: 'url' } }];
        let iterator9 = new quill_delta.OpIterator(ops9);
        let result9 = iterator9.next(1);
        assert.deepEqual(result9, { insert: { image: 'url' } });
        
        // Test 10: Multiple next() calls on same operation
        let ops10 = [{ insert: 'hello' }];
        let iterator10 = new quill_delta.OpIterator(ops10);
        let result10a = iterator10.next(2);
        let result10b = iterator10.next(3);
        assert.deepEqual(result10a, { insert: 'he' });
        assert.deepEqual(result10b, { insert: 'llo' });
        
        done();
    });
});