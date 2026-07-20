let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.length', function(done) {
        // Test 1: Empty delta should have length 0
        let emptyDelta = new quill_delta();
        assert.strictEqual(emptyDelta.length(), 0);

        // Test 2: Single insert operation
        let insertDelta = new quill_delta().insert('Hello');
        assert.strictEqual(insertDelta.length(), 5);

        // Test 3: Mixed operations - insert, retain, delete
        let mixedDelta = new quill_delta().insert('A').retain(2).delete(1);
        assert.strictEqual(mixedDelta.length(), 4);

        // Test 4: Multiple insert operations
        let multiInsertDelta = new quill_delta().insert('Hello').insert(' World');
        assert.strictEqual(multiInsertDelta.length(), 11);

        // Test 5: Only retain operations
        let retainDelta = new quill_delta().retain(5).retain(3);
        assert.strictEqual(retainDelta.length(), 8);

        // Test 6: Only delete operations
        let deleteDelta = new quill_delta().delete(3).delete(2);
        assert.strictEqual(deleteDelta.length(), 5);

        // Test 7: Complex mixed operations
        let complexDelta = new quill_delta()
            .insert('Test')
            .retain(10)
            .delete(5)
            .insert('ing');
        assert.strictEqual(complexDelta.length(), 22);

        // Test 8: Single character insert
        let singleCharDelta = new quill_delta().insert('X');
        assert.strictEqual(singleCharDelta.length(), 1);

        done();
    });
});