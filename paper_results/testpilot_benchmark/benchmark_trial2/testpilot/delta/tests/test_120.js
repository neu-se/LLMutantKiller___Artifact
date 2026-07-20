let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.map', function(done) {
        // Test 1: Map string inserts to uppercase
        const delta1 = new Delta()
            .insert('Hello', { bold: true })
            .insert({ image: 'https://example.com/image.png' })
            .insert('World!');
        
        const uppercased = delta1.map((op) => {
            if (typeof op.insert === 'string') {
                return { ...op, insert: op.insert.toUpperCase() };
            }
            return op;
        });
        
        assert.strictEqual(uppercased.ops[0].insert, 'HELLO');
        assert.strictEqual(uppercased.ops[2].insert, 'WORLD!');
        assert.deepStrictEqual(uppercased.ops[1].insert, { image: 'https://example.com/image.png' });

        // Test 2: Extract only text content (similar to usage examples)
        const delta2 = new Delta()
            .insert('Hello', { bold: true })
            .insert({ image: 'https://example.com/image.png' })
            .insert('World!');
        
        const textOnly = delta2
            .map((op) => {
                if (typeof op.insert === 'string') {
                    return op.insert;
                } else {
                    return '';
                }
            })
            .join('');
        
        assert.strictEqual(textOnly, 'HelloWorld!');

        // Test 3: Map with retain operations
        const delta3 = new Delta()
            .insert('Hello')
            .retain(5, { bold: true })
            .insert('World');
        
        const mapped = delta3.map((op) => {
            if (op.retain) {
                return { ...op, retain: op.retain * 2 };
            }
            return op;
        });
        
        assert.strictEqual(mapped.ops[1].retain, 10);
        assert.strictEqual(mapped.ops[0].insert, 'Hello');
        assert.strictEqual(mapped.ops[2].insert, 'World');

        // Test 4: Map with delete operations
        const delta4 = new Delta()
            .insert('Hello')
            .delete(3)
            .insert('World');
        
        const deleteMapped = delta4.map((op) => {
            if (op.delete) {
                return { delete: op.delete + 1 };
            }
            return op;
        });
        
        assert.strictEqual(deleteMapped.ops[1].delete, 4);

        // Test 5: Empty delta
        const emptyDelta = new Delta();
        const emptyMapped = emptyDelta.map((op) => op);
        assert.strictEqual(emptyMapped.ops.length, 0);

        done();
    });
});