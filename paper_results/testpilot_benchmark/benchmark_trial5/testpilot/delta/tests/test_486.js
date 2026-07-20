let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.prototype.changeLength', function(done) {
        // Test 1: Empty delta should return 0
        let delta1 = new quill_delta();
        assert.equal(delta1.changeLength(), 0);

        // Test 2: Delta with only insert operations
        let delta2 = new quill_delta();
        delta2.insert('Hello');
        delta2.insert(' World');
        assert.equal(delta2.changeLength(), 11); // "Hello World" = 11 characters

        // Test 3: Delta with only delete operations
        let delta3 = new quill_delta();
        delta3.delete(5);
        delta3.delete(3);
        assert.equal(delta3.changeLength(), -8); // -5 + -3 = -8

        // Test 4: Delta with mixed insert and delete operations
        let delta4 = new quill_delta();
        delta4.insert('Hello');  // +5
        delta4.delete(2);        // -2
        delta4.insert(' World'); // +6
        delta4.delete(1);        // -1
        assert.equal(delta4.changeLength(), 8); // 5 - 2 + 6 - 1 = 8

        // Test 5: Delta with retain operations (should not affect length)
        let delta5 = new quill_delta();
        delta5.retain(10);
        delta5.insert('test');
        delta5.retain(5);
        delta5.delete(3);
        assert.equal(delta5.changeLength(), 1); // 0 + 4 + 0 - 3 = 1

        // Test 6: Delta with insert objects (like embeds)
        let delta6 = new quill_delta();
        delta6.insert('text');
        delta6.insert({ image: 'url' }); // embeds typically have length 1
        delta6.insert('more');
        assert.equal(delta6.changeLength(), 9); // 4 + 1 + 4 = 9

        // Test 7: Complex delta with all operation types
        let delta7 = new quill_delta();
        delta7.insert('Start');    // +5
        delta7.retain(3);          // +0
        delta7.delete(2);          // -2
        delta7.insert(' End');     // +4
        delta7.retain(1);          // +0
        assert.equal(delta7.changeLength(), 7); // 5 + 0 - 2 + 4 + 0 = 7

        done();
    });
});