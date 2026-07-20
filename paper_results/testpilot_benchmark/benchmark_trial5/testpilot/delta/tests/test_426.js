let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.map', function(done) {
        // Test 1: Map string inserts to uppercase
        const delta1 = new quill_delta()
            .insert('Hello', { bold: true })
            .insert({ image: 'https://example.com/image.png' })
            .insert('World!');
        
        const uppercased = delta1.map((op) => {
            if (typeof op.insert === 'string') {
                return { ...op, insert: op.insert.toUpperCase() };
            }
            return op;
        });
        
        assert.strictEqual(uppercased[0].insert, 'HELLO');
        assert.strictEqual(uppercased[2].insert, 'WORLD!');
        assert.deepStrictEqual(uppercased[1].insert, { image: 'https://example.com/image.png' });
        
        // Test 2: Extract only string content (similar to usage example)
        const textOnly = delta1
            .map((op) => {
                if (typeof op.insert === 'string') {
                    return op.insert;
                } else {
                    return '';
                }
            });
        
        assert.strictEqual(textOnly[0], 'Hello');
        assert.strictEqual(textOnly[1], '');
        assert.strictEqual(textOnly[2], 'World!');
        
        // Test 3: Map with index parameter
        const withIndex = delta1.map((op, index) => {
            return { ...op, index: index };
        });
        
        assert.strictEqual(withIndex[0].index, 0);
        assert.strictEqual(withIndex[1].index, 1);
        assert.strictEqual(withIndex[2].index, 2);
        
        // Test 4: Empty delta
        const emptyDelta = new quill_delta();
        const mappedEmpty = emptyDelta.map((op) => op);
        assert.strictEqual(mappedEmpty.length, 0);
        
        // Test 5: Map operations with different types
        const mixedDelta = new quill_delta()
            .insert('text')
            .retain(5)
            .delete(3);
        
        const operationTypes = mixedDelta.map((op) => {
            if (op.insert !== undefined) return 'insert';
            if (op.retain !== undefined) return 'retain';
            if (op.delete !== undefined) return 'delete';
            return 'unknown';
        });
        
        assert.deepStrictEqual(operationTypes, ['insert', 'retain', 'delete']);
        
        done();
    });
});