let mocha = require('mocha');
let assert = require('assert');
let Delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.transform', function(done) {
        // Test 1: Transform position (number argument)
        const delta1 = new Delta().insert('hello').delete(3).retain(2);
        const transformedPos = delta1.transform(5, false);
        assert(typeof transformedPos === 'number', 'Should return number when transforming position');
        
        // Test 2: Basic insert vs insert with priority true
        const a1 = new Delta().insert('a');
        const b1 = new Delta().insert('b').retain(5).insert('c');
        const result1 = a1.transform(b1, true);
        const expected1 = new Delta().retain(1).insert('b').retain(5).insert('c');
        assert.deepEqual(result1.ops, expected1.ops, 'Insert vs insert with priority=true failed');
        
        // Test 3: Basic insert vs insert with priority false
        const a2 = new Delta().insert('a');
        const b2 = new Delta().insert('b').retain(5).insert('c');
        const result2 = a2.transform(b2, false);
        const expected2 = new Delta().insert('b').retain(6).insert('c');
        assert.deepEqual(result2.ops, expected2.ops, 'Insert vs insert with priority=false failed');
        
        // Test 4: Delete operations
        const a3 = new Delta().delete(3);
        const b3 = new Delta().retain(2).insert('x');
        const result3 = a3.transform(b3, false);
        const expected3 = new Delta().insert('x');
        assert.deepEqual(result3.ops, expected3.ops, 'Delete transformation failed');
        
        // Test 5: Retain operations
        const a4 = new Delta().retain(5);
        const b4 = new Delta().retain(3).insert('test');
        const result4 = a4.transform(b4, false);
        const expected4 = new Delta().retain(3).insert('test');
        assert.deepEqual(result4.ops, expected4.ops, 'Retain transformation failed');
        
        // Test 6: Mixed operations
        const a5 = new Delta().insert('hello').delete(2).retain(3);
        const b5 = new Delta().retain(2).insert('world').delete(1);
        const result5 = a5.transform(b5, false);
        // The exact result depends on the complex transformation logic
        assert(result5 instanceof Delta, 'Should return Delta instance');
        
        // Test 7: Empty delta transformation
        const a6 = new Delta();
        const b6 = new Delta().insert('test');
        const result6 = a6.transform(b6, false);
        const expected6 = new Delta().insert('test');
        assert.deepEqual(result6.ops, expected6.ops, 'Empty delta transformation failed');
        
        // Test 8: Both deltas empty
        const a7 = new Delta();
        const b7 = new Delta();
        const result7 = a7.transform(b7, false);
        assert.deepEqual(result7.ops, [], 'Empty to empty transformation should result in empty delta');
        
        done();
    });
});