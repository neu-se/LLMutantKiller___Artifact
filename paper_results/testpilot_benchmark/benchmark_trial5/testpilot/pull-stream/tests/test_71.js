let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with onAbort callback', function(done) {
        const testArray = [1, 2, 3, 4, 5];
        let abortCalled = false;
        
        const onAbort = function() {
            abortCalled = true;
        };
        
        const source = pull_stream.values(testArray, onAbort);
        
        // Start reading then abort
        source(null, function(end, data) {
            if (end) return;
            
            // Abort the stream after first value
            source(true, function() {
                // Give a small delay to ensure abort callback is called
                setTimeout(() => {
                    assert.strictEqual(abortCalled, true);
                    done();
                }, 10);
            });
        });
    });

    })