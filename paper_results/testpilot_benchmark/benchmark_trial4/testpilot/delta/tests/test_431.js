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
        
        assert.equal(uppercased.ops[0].insert, 'HELLO');
        assert.equal(uppercased.ops[2].insert, 'WORLD!');
        assert.deepEqual(uppercased.ops[1].insert, { image: 'https://example.com/image.png' });

        // Test 2: Extract only text content (similar to usage examples)
        const delta2 = new Delta()
            .insert('Hello', { bold: true })
            .insert({ image: 'https://example.com/image.png' })
            .insert('World!');
        
        const textOnly = delta2
            .filter((op) => typeof op.insert === 'string')
            .map((op) => op.insert)
            .join('');
        
        assert.equal(textOnly, 'HelloWorld!');

        // Test 3: Map all operations to text, replacing non-text with empty string
        const delta3 = new Delta()
            .insert('Hello', { bold: true })
            .insert({ image: 'https://example.com/image.png' })
            .insert('World!');
        
        const allToText = delta3
            .map((op) => {
                if (typeof op.insert === 'string') {
                    return op.insert;
                } else {
                    return '';
                }
            })
            .join('');
        
        assert.equal(allToText, 'HelloWorld!');

        // Test 4: Map with retain and delete operations
        const delta4 = new Delta()
            .insert('Hello')
            .retain(5)
            .delete(3)
            .insert('World');
        
        const mapped = delta4.map((op) => {
            if (op.insert) {
                return { ...op, insert: `[${op.insert}]` };
            }
            return op;
        });
        
        assert.equal(mapped.ops[0].insert, '[Hello]');
        assert.equal(mapped.ops[1].retain, 5);
        assert.equal(mapped.ops[2].delete, 3);
        assert.equal(mapped.ops[3].insert, '[World]');

        // Test 5: Empty delta
        const delta5 = new Delta();
        const emptyMapped = delta5.map((op) => op);
        assert.equal(emptyMapped.ops.length, 0);

        done();
    });
});