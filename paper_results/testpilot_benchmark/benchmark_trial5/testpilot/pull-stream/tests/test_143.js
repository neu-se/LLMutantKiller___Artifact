let assert = require('assert');

function infinite (generate) {
  generate = generate || Math.random
  return function (end, cb) {
    if(end) return cb && cb(end)
    return cb(null, generate())
  }
}

describe('test pull_stream', function() {
    it('test pull-stream.infinite with custom generator', function(done) {
        let counter = 0;
        let customGenerator = function() {
            return ++counter;
        };
        
        let stream = infinite(customGenerator);
        
        stream(false, function(err, value) {
            assert.strictEqual(err, null);
            assert.strictEqual(value, 1);
            
            stream(false, function(err, value) {
                assert.strictEqual(err, null);
                assert.strictEqual(value, 2);
                
                stream(false, function(err, value) {
                    assert.strictEqual(err, null);
                    assert.strictEqual(value, 3);
                    done();
                });
            });
        });
    });
});