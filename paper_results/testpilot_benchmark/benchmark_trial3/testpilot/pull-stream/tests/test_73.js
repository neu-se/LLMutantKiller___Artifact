let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with onAbort callback', function(done) {
        const testArray = [1, 2, 3, 4, 5];
        let abortCalled = false;
        
        const source = pull_stream.values(testArray, function() {
            abortCalled = true;
        });
        
        // Start reading but abort after first item
        source(null, function(end, data) {
            if (end) return;
            assert.strictEqual(data, 1);
            
            // Abort the stream
            source(true, function() {
                // Give a small delay to ensure abort callback is called
                setTimeout(function() {
                    assert.strictEqual(abortCalled, true);
                    done();
                }, 10);
            });
        });
    });

    })