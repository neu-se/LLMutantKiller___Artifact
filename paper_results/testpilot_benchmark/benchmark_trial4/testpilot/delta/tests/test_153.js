let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.OpIterator.prototype.rest', function(done) {
        // Test 1: Empty iterator - should return empty array
        let emptyDelta = new quill_delta.Delta();
        let emptyIterator = new quill_delta.OpIterator(emptyDelta.ops);
        assert.deepEqual(emptyIterator.rest(), []);

        // Test 2: Iterator at beginning with no offset - should return all ops
        let delta1 = new quill_delta.Delta()
            .insert('Hello')
            .insert(' ')
            .insert('World');
        let iterator1 = new quill_delta.OpIterator(delta1.ops);
        let expected1 = [
            { insert: 'Hello' },
            { insert: ' ' },
            { insert: 'World' }
        ];
        assert.deepEqual(iterator1.rest(), expected1);

        // Test 3: Iterator after consuming some ops with no offset
        let delta2 = new quill_delta.Delta()
            .insert('Hello')
            .insert(' ')
            .insert('World');
        let iterator2 = new quill_delta.OpIterator(delta2.ops);
        iterator2.next(); // consume first op
        let expected2 = [
            { insert: ' ' },
            { insert: 'World' }
        ];
        assert.deepEqual(iterator2.rest(), expected2);

        // Test 4: Iterator with offset - should return partial current op plus remaining ops
        let delta3 = new quill_delta.Delta()
            .insert('Hello World')
            .insert('!');
        let iterator3 = new quill_delta.OpIterator(delta3.ops);
        iterator3.next(5); // consume 5 characters, creating offset
        let result3 = iterator3.rest();
        let expected3 = [
            { insert: ' World' },
            { insert: '!' }
        ];
        assert.deepEqual(result3, expected3);

        // Test 5: Iterator at end - should return empty array
        let delta4 = new quill_delta.Delta().insert('Test');
        let iterator4 = new quill_delta.OpIterator(delta4.ops);
        iterator4.next(); // consume all ops
        assert.deepEqual(iterator4.rest(), []);

        // Test 6: Verify iterator state is preserved after rest() call
        let delta5 = new quill_delta.Delta()
            .insert('Hello')
            .insert(' World');
        let iterator5 = new quill_delta.OpIterator(delta5.ops);
        iterator5.next(3); // consume 3 characters, creating offset
        let originalIndex = iterator5.index;
        let originalOffset = iterator5.offset;
        iterator5.rest();
        // Verify state is restored
        assert.equal(iterator5.index, originalIndex);
        assert.equal(iterator5.offset, originalOffset);

        done();
    });
});