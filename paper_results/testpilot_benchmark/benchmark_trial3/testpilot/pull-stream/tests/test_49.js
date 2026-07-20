let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.once - should call onAbort when stream is aborted', function(done) {
        let abortCalled = false;
        let abortReason = null;
        
        const onAbort = function(reason) {
            abortCalled = true;
            abortReason = reason;
        };
        
        const source = pull_stream.once('test value', onAbort);
        
        // Start reading but then abort
        source(null, function(end, data) {
            if (end) return;
            
            // Abort the stream
            const abortError = new Error('Stream aborted');
            source(abortError, function() {
                // Give a small delay to ensure onAbort is called
                setTimeout(function() {
                    assert.strictEqual(abortCalled, true);
                    assert.strictEqual(abortReason, abortError);
                    done();
                }, 10);
            });
        });
    });

    })