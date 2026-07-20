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

        // Test 3: Map with conditional logic (similar to usage #2)
        const delta3 = new Delta()
            .insert('Hello', { bold: true })
            .insert({ image: 'https://example.com/image.png' })
            .insert('World!');
        
        const mapped = delta3.map((op) => {
            if (typeof op.insert === 'string') {
                return op.insert;
            } else {
                return '[EMBED]';
            }
        });
        
        assert.equal(mapped.join(''), 'Hello[EMBED]World!');

        // Test 4: Map empty delta
        const emptyDelta = new Delta();
        const mappedEmpty = emptyDelta.map((op) => op);
        assert.equal(mappedEmpty.ops.length, 0);

        // Test 5: Map operations with retain and delete
        const delta4 = new Delta()
            .retain(5)
            .delete(3)
            .insert('test');
        
        const mappedOps = delta4.map((op) => {
            if (op.insert) {
                return { ...op, insert: op.insert + '_mapped' };
            }
            return op;
        });
        
        assert.equal(mappedOps.ops[0].retain, 5);
        assert.equal(mappedOps.ops[1].delete, 3);
        assert.equal(mappedOps.ops[2].insert, 'test_mapped');

        done();
    });
});