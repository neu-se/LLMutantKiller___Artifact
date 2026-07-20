let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with abort', function(done) {
        const testArray = [1, 2, 3, 4, 5];
        const source = pull_stream.values(testArray);
        let callCount = 0;
        
        function read() {
            source(false, function(end, data) {
                callCount++;
                if (callCount === 2) {
                    // Abort after reading second item
                    source(true, function(end, data) {
                        assert.strictEqual(end, true);
                        done();
                    });
                } else if (!end) {
                    setTimeout(read, 0);
                }
            });
        }
        
        read();
    });

    })