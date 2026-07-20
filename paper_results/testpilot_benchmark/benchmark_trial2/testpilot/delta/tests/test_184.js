let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transform', function(done) {
        // Test 1: Transform with priority true
        const a1 = new Delta().insert('a');
        const b1 = new Delta().insert('b').retain(5).insert('c');
        const result1 = a1.transform(b1, true);
        const expected1 = new Delta().retain(1).insert('b').retain(5).insert('c');
        assert.deepEqual(result1.ops, expected1.ops, 'Transform with priority true failed');

        // Test 2: Transform with priority false
        const a2 = new Delta().insert('a');
        const b2 = new Delta().insert('b').retain(5).insert('c');
        const result2 = a2.transform(b2, false);
        const expected2 = new Delta().insert('b').retain(6).insert('c');
        assert.deepEqual(result2.ops, expected2.ops, 'Transform with priority false failed');

        // Test 3: Transform position (number argument)
        const delta3 = new Delta().insert('hello').delete(3).retain(2);
        const position = 5;
        const transformedPos = delta3.transform(position, false);
        assert.equal(typeof transformedPos, 'number', 'Transform position should return a number');

        // Test 4: Transform with delete operations
        const a4 = new Delta().delete(3);
        const b4 = new Delta().retain(2).insert('x');
        const result4 = a4.transform(b4, false);
        const expected4 = new Delta().insert('x');
        assert.deepEqual(result4.ops, expected4.ops, 'Transform with delete operations failed');

        // Test 5: Transform with retain operations
        const a5 = new Delta().retain(3);
        const b5 = new Delta().retain(2).insert('y');
        const result5 = a5.transform(b5, false);
        const expected5 = new Delta().retain(2).insert('y');
        assert.deepEqual(result5.ops, expected5.ops, 'Transform with retain operations failed');

        // Test 6: Empty delta transformation
        const a6 = new Delta();
        const b6 = new Delta().insert('test');
        const result6 = a6.transform(b6, false);
        const expected6 = new Delta().insert('test');
        assert.deepEqual(result6.ops, expected6.ops, 'Empty delta transformation failed');

        // Test 7: Transform with attributes
        const a7 = new Delta().retain(3, { bold: true });
        const b7 = new Delta().retain(2, { italic: true }).insert('z');
        const result7 = a7.transform(b7, false);
        const expected7 = new Delta().retain(2, { italic: true }).insert('z');
        assert.deepEqual(result7.ops, expected7.ops, 'Transform with attributes failed');

        done();
    });
});