const assert = require('assert');

function infinite (generate) {
  generate = generate || Math.random
  return function (end, cb) {
    if(end) return cb && cb(end)
    return cb(null, generate())
  }
}

// Simple test runner
function describe(name, fn) {
  console.log(`\n${name}`);
  fn();
}

function it('test pull-stream.infinite handles end signal without callback', function(done) {
        let stream = infinite();
        let endError = new Error('stream ended');
        
        // Should not throw when no callback is provided
        let result = stream(endError);
        assert.strictEqual(result, undefined);
        done();
    });
});