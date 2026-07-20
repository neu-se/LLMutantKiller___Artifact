let mocha = require('mocha');
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
            { insert: ' World', attributes: { bold: true } }
        ]);
        let mappedInsert = insertDelta.map(op => ({ ...op, type: 'insert' }));
        assert.deepEqual(mappedInsert, [
            { insert: 'Hello', type: 'insert' },
            { insert: ' World', attributes: { bold: true }, type: 'insert' }
        ]);

        // Test 3: Map over delta with different operation types
        let mixedDelta = new quill_delta([
            { insert: 'Hello' },
            { delete: 5 },
            { retain: 3, attributes: { italic: true } }
        ]);
        let mappedMixed = mixedDelta.map((op, index) => ({ ...op, index: index }));
        assert.deepEqual(mappedMixed, [
            { insert: 'Hello', index: 0 },
            { delete: 5, index: 1 },
            { retain: 3, attributes: { italic: true }, index: 2 }
        ]);

        // Test 4: Map with transformation function
        let textDelta = new quill_delta([
            { insert: 'hello' },
            { insert: 'world' }
        ]);
        let uppercaseMapped = textDelta.map(op => {
            if (op.insert && typeof op.insert === 'string') {
                return { ...op, insert: op.insert.toUpperCase() };
            }
            return op;
        });
        assert.deepEqual(uppercaseMapped, [
            { insert: 'HELLO' },
            { insert: 'WORLD' }
        ]);

        // Test 5: Verify original delta is not modified
        let originalDelta = new quill_delta([{ insert: 'test' }]);
        let originalOps = JSON.parse(JSON.stringify(originalDelta.ops));
        originalDelta.map(op => ({ ...op, modified: true }));
        assert.deepEqual(originalDelta.ops, originalOps);

        done();
    });
});