let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.retain', function(done) {
        // Test 1: Basic retain with positive length
        let delta1 = new quill_delta();
        let result1 = delta1.retain(5);
        assert.strictEqual(result1.ops.length, 1);
        assert.strictEqual(result1.ops[0].retain, 5);
        assert.strictEqual(result1.ops[0].attributes, undefined);

        // Test 2: Retain with attributes
        let delta2 = new quill_delta();
        let attributes = { bold: true, italic: true };
        let result2 = delta2.retain(3, attributes);
        assert.strictEqual(result2.ops.length, 1);
        assert.strictEqual(result2.ops[0].retain, 3);
        assert.deepStrictEqual(result2.ops[0].attributes, attributes);

        // Test 3: Retain with zero length (should return same delta)
        let delta3 = new quill_delta();
        let result3 = delta3.retain(0);
        assert.strictEqual(result3.ops.length, 0);
        assert.strictEqual(result3, delta3);

        // Test 4: Retain with negative length (should return same delta)
        let delta4 = new quill_delta();
        let result4 = delta4.retain(-5);
        assert.strictEqual(result4.ops.length, 0);
        assert.strictEqual(result4, delta4);

        // Test 5: Retain with null attributes
        let delta5 = new quill_delta();
        let result5 = delta5.retain(2, null);
        assert.strictEqual(result5.ops.length, 1);
        assert.strictEqual(result5.ops[0].retain, 2);
        assert.strictEqual(result5.ops[0].attributes, undefined);

        // Test 6: Retain with empty attributes object
        let delta6 = new quill_delta();
        let result6 = delta6.retain(4, {});
        assert.strictEqual(result6.ops.length, 1);
        assert.strictEqual(result6.ops[0].retain, 4);
        assert.strictEqual(result6.ops[0].attributes, undefined);

        // Test 7: Retain with non-object attributes
        let delta7 = new quill_delta();
        let result7 = delta7.retain(1, "not an object");
        assert.strictEqual(result7.ops.length, 1);
        assert.strictEqual(result7.ops[0].retain, 1);
        assert.strictEqual(result7.ops[0].attributes, undefined);

        // Test 8: Multiple retain operations
        let delta8 = new quill_delta();
        let result8 = delta8.retain(2).retain(3, { bold: true });
        assert.strictEqual(result8.ops.length, 2);
        assert.strictEqual(result8.ops[0].retain, 2);
        assert.strictEqual(result8.ops[1].retain, 3);
        assert.deepStrictEqual(result8.ops[1].attributes, { bold: true });

        done();
    });
});