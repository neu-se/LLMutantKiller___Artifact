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

// Test function
function test_pull_stream_infinite_handles_end_signal_without_callback() {
    const stream = infinite();
    const endError = new Error('stream ended');
    
    // Should not throw when no callback is provided
    assert.doesNotThrow(() => {
        stream(endError);
    });
    
    console.log('✓ test pull-stream.infinite handles end signal without callback');
}

// Run the test
try {
    test_pull_stream_infinite_handles_end_signal_without_callback();
    console.log('All tests passed!');
} catch (error) {
    console.error('Test failed:', error.message);
    process.exit(1);
}
    })
})