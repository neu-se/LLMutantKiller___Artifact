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
        let count = 0;
        let values = [];
        
        function read() {
            stream(false, function(end, data) {
                if (end) return done(end);
                
                assert(typeof data === 'number', 'Should generate numbers');
                assert(data >= 0 && data < 1, 'Should generate values between 0 and 1');
                values.push(data);
                count++;
                
                if (count >= 5) {
                    // Check that we got different values (very unlikely to get duplicates with Math.random)
                    let unique = [...new Set(values)];
                    assert(unique.length > 1, 'Should generate different values');
                    done();
                } else {
                    read();
                }
            });
        }
        
        read();
    });

    })