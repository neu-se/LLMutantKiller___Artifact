let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

function infinite (generate) {
  generate = generate || Math.random
  return function (end, cb) {
    if(end) return cb && cb(end)
    return cb(null, generate())
  }
}

describe('test pull_stream', function() {
    it('test pull-stream.infinite with default Math.random generator', function(done) {
        let stream = infinite();
        let callCount = 0;
        
        // Test that it generates values without ending
        stream(false, function(err, value) {
            assert.strictEqual(err, null);
            assert.strictEqual(typeof value, 'number');
            assert(value >= 0 && value < 1); // Math.random range
            callCount++;
            
            // Test second call
            stream(false, function(err, value) {
                assert.strictEqual(err, null);
                assert.strictEqual(typeof value, 'number');
                assert(value >= 0 && value < 1);
                callCount++;
                
                assert.strictEqual(callCount, 2);
                done();
            });
        });
    });
    
    })