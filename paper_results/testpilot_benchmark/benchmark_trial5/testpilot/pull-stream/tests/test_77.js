let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with abort', function(done) {
        const testArray = [1, 2, 3, 4, 5];
        const source = pull_stream.values(testArray);
        let callCount = 0;
        
        function read() {
            source(false, function(err, data) {
                callCount++;
                if (callCount === 2) {
                    // Abort after reading second item
                    source(true, function(abortErr) {
                        assert.strictEqual(abortErr, true);
                        done();
                    });
                } else if (callCount < 2) {
                    assert.strictEqual(err, null);
                    assert.strictEqual(data, testArray[callCount - 1]);
                    read();
                }
            });
        }
        
        read();
    });

    })