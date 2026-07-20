let assert = require('assert');

function infinite (generate) {
  generate = generate || Math.random
  return function (end, cb) {
    if(end) return cb && cb(end)
    return cb(null, generate())
  }
}

describe('test pull_stream', function() {
    it('test pull-stream.infinite handles end signal', function(done) {
        const stream = infinite();
        const endError = new Error('stream ended');
        
        stream(endError, (err) => {
            assert.strictEqual(err, endError);
            done();
        });
    });
});