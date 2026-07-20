let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.rest', function(done) {
        // Test 1: Empty iterator - should return empty array
        let delta1 = new quill_delta([]);
        let iter1 = new quill_delta.OpIterator(delta1.ops);
        let result1 = iter1.rest();
        assert.deepEqual(result1, []);

        // Test 2: Iterator at beginning with no offset - should return all ops
        let delta2 = new quill_delta([
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World' }
        ]);
        let iter2 = new quill_delta.OpIterator(delta2.ops);
        let result2 = iter2.rest();
        assert.deepEqual(result2, [
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World' }
        ]);

        // Test 3: Iterator after consuming some ops with no offset
        let delta3 = new quill_delta([
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World' }
        ]);
        let iter3 = new quill_delta.OpIterator(delta3.ops);
        iter3.next(); // consume first op
        let result3 = iter3.rest();
        assert.deepEqual(result3, [
            { insert: ' ' },
            { insert: 'World' }
        ]);

        // Test 4: Iterator with offset (partial consumption of current op)
        let delta4 = new quill_delta([
            { insert: 'Hello' },
            { insert: 'World' }
        ]);
        let iter4 = new quill_delta.OpIterator(delta4.ops);
        iter4.next(2); // consume 2 characters from 'Hello'
        let result4 = iter4.rest();
        assert.deepEqual(result4, [
            { insert: 'llo' }, // remaining part of first op
            { insert: 'World' } // second op
        ]);

        // Test 5: Iterator at the end - should return empty array
        let delta5 = new quill_delta([
            { insert: 'Hello' }
        ]);
        let iter5 = new quill_delta.OpIterator(delta5.ops);
        iter5.next(); // consume all ops
        let result5 = iter5.rest();
        assert.deepEqual(result5, []);

        // Test 6: Iterator with different op types
        let delta6 = new quill_delta([
            { insert: 'Hello' },
            { delete: 5 },
            { retain: 3 }
        ]);
        let iter6 = new quill_delta.OpIterator(delta6.ops);
        iter6.next(); // consume first op
        let result6 = iter6.rest();
        assert.deepEqual(result6, [
            { delete: 5 },
            { retain: 3 }
        ]);

        done();
    });
});