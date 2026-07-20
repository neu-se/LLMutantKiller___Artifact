describe('test suite', function() {
    it('test case', function(done) {
        const assert = require('assert');

function infinite (generate) {
  generate = generate || Math.random
  return function (end, cb) {
    if(end) return cb && cb(end)
    return cb(null, generate())
  }
}

// Test the infinite function with custom generator
function testInfiniteWithCustomGenerator() {
    let counter = 0;
    const customGenerator = () => ++counter;
    const stream = infinite(customGenerator);
    
    stream(false, (err, value) => {
        assert.strictEqual(err, null);
        assert.strictEqual(value, 1);
        
        stream(false, (err2, value2) => {
            assert.strictEqual(err2, null);
            assert.strictEqual(value2, 2);
            console.log('Test passed: pull-stream infinite with custom generator');
        });
    });
}

// Run the test
testInfiniteWithCustomGenerator();
    })
})