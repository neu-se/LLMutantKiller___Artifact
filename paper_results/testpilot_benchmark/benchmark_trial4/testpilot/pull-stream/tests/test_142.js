describe('test suite', function() {
    it('test case', function(done) {
        let assert = require('assert');

function infinite (generate) {
  generate = generate || Math.random
  return function (end, cb) {
    if(end) return cb && cb(end)
    return cb(null, generate())
  }
}

// Simple test without mocha dependency
console.log('Testing pull_stream infinite function...');

// Test 1: infinite with default Math.random generator
const stream = infinite();

// Test that it generates values without ending
stream(false, (err, value) => {
    assert.strictEqual(err, null);
    assert.strictEqual(typeof value, 'number');
    assert(value >= 0 && value < 1); // Math.random range
    
    // Test another call to ensure it keeps generating
    stream(false, (err2, value2) => {
        assert.strictEqual(err2, null);
        assert.strictEqual(typeof value2, 'number');
        assert(value2 >= 0 && value2 < 1);
        
        console.log('✓ All tests passed!');
    });
});

// Test 2: Test with end=true
stream(true, (err) => {
    assert.strictEqual(err, true);
    console.log('✓ End condition test passed!');
});
    })
})