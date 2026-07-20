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

        // Test 2: Extract only text content (similar to usage example #2)
        const delta2 = new Delta()
            .insert('Hello', { bold: true })
            .insert({ image: 'https://example.com/image.png' })
            .insert('World!');
        
        const textOnly = delta2.map((op) => {
            if (typeof op.insert === 'string') {
                return op.insert;
            } else {
                return '';
            }
        });
        
        const joinedText = textOnly.join('');
        assert.equal(joinedText, 'HelloWorld!');

        // Test 3: Map with retain operations
        const delta3 = new Delta()
            .retain(5)
            .insert('test')
            .delete(3);
        
        const mapped = delta3.map((op) => {
            if (op.retain) {
                return { retain: op.retain * 2 };
            }
            return op;
        });
        
        assert.equal(mapped.ops[0].retain, 10);
        assert.equal(mapped.ops[1].insert, 'test');
        assert.equal(mapped.ops[2].delete, 3);

        // Test 4: Map empty delta
        const emptyDelta = new Delta();
        const mappedEmpty = emptyDelta.map((op) => op);
        assert.equal(mappedEmpty.ops.length, 0);

        // Test 5: Map with attributes modification
        const delta4 = new Delta()
            .insert('Bold text', { bold: true })
            .insert('Normal text');
        
        const withItalic = delta4.map((op) => {
            if (op.attributes && op.attributes.bold) {
                return { ...op, attributes: { ...op.attributes, italic: true } };
            }
            return op;
        });
        
        assert.equal(withItalic.ops[0].attributes.bold, true);
        assert.equal(withItalic.ops[0].attributes.italic, true);
        assert.equal(withItalic.ops[1].attributes, undefined);

        done();
    });
});