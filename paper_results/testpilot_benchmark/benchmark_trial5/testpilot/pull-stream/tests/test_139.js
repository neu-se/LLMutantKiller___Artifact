let assert = require('assert');

function infinite (generate) {
  generate = generate || Math.random
  return function (end, cb) {
    if(end) return cb && cb(end)
    return cb(null, generate())
  }
}

// Simple test runner to replace mocha
function describe(name, fn) {
    console.log(`\n${name}`);
    fn();
}

function it('test pull-stream.infinite with generator that returns different types', function(done) {
        let values = ['string', 42, true, null, {key: 'value'}];
        let index = 0;
        
        let generator = function() {
            return values[index++ % values.length];
        };
        
        let stream = infinite(generator);
        
        stream(false, function(err, value) {
            assert.strictEqual(err, null);
            assert.strictEqual(value, 'string');
            
            stream(false, function(err, value) {
                assert.strictEqual(err, null);
                assert.strictEqual(value, 42);
                
                stream(false, function(err, value) {
                    assert.strictEqual(err, null);
                    assert.strictEqual(value, true);
                    done();
                });
            });
        });
    });
});