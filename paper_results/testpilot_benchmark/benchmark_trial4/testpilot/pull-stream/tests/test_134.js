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
    it('test pull-stream.infinite with custom generator', function(done) {
        let counter = 0;
        const customGenerator = () => ++counter;
        const stream = infinite(customGenerator);
        
        stream(false, (err, value) => {
            assert.strictEqual(err, null);
            assert.strictEqual(value, 1);
            
            stream(false, (err2, value2) => {
                assert.strictEqual(err2, null);
                assert.strictEqual(value2, 2);
                done();
            });
        });
    });

    })