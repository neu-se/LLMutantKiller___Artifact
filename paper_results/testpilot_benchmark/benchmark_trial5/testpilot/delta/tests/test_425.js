let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.map', function(done) {
        // Test 1: Map over empty delta
        let emptyDelta = new quill_delta();
        let mappedEmpty = emptyDelta.map(op => ({ ...op, mapped: true }));
        assert.deepEqual(mappedEmpty, []);

        // Test 2: Map over delta with insert operations
        let insertDelta = new quill_delta([
            { insert: 'Hello' },
            { insert: ' World' }
        ]);
        let mappedInsert = insertDelta.map(op => ({ ...op, length: op.insert.length }));
        assert.deepEqual(mappedInsert, [
            { insert: 'Hello', length: 5 },
            { insert: ' World', length: 6 }
        ]);

        // Test 3: Map over delta with mixed operations
        let mixedDelta = new quill_delta([
            { insert: 'Hello' },
            { retain: 5 },
            { delete: 3 },
            { insert: 'World', attributes: { bold: true } }
        ]);
        let mappedMixed = mixedDelta.map(op => {
            if (op.insert) return { type: 'insert', content: op.insert };
            if (op.retain) return { type: 'retain', length: op.retain };
            if (op.delete) return { type: 'delete', length: op.delete };
            return op;
        });
        assert.deepEqual(mappedMixed, [
            { type: 'insert', content: 'Hello' },
            { type: 'retain', length: 5 },
            { type: 'delete', length: 3 },
            { type: 'insert', content: 'World' }
        ]);

        // Test 4: Map with index parameter
        let indexDelta = new quill_delta([
            { insert: 'A' },
            { insert: 'B' },
            { insert: 'C' }
        ]);
        let mappedWithIndex = indexDelta.map((op, index) => ({ ...op, index }));
        assert.deepEqual(mappedWithIndex, [
            { insert: 'A', index: 0 },
            { insert: 'B', index: 1 },
            { insert: 'C', index: 2 }
        ]);

        // Test 5: Map returning different data types
        let numberDelta = new quill_delta([
            { insert: 'Hello' },
            { retain: 10 }
        ]);
        let mappedNumbers = numberDelta.map((op, index) => index);
        assert.deepEqual(mappedNumbers, [0, 1]);

        done();
    });
});