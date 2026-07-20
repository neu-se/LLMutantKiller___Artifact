let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.onEnd callback is called exactly once', function(done) {
        let callCount = 0;
        
        pull_stream(
            pull_stream.values([1, 2, 3, 4, 5]),
            pull_stream.onEnd(function(err) {
                callCount++;
                assert.strictEqual(callCount, 1, 'Callback should be called exactly once');
                assert.strictEqual(err, null, 'Should not have an error');
                
                // Use setTimeout to ensure callback isn't called again
                setTimeout(() => {
                    assert.strictEqual(callCount, 1, 'Callback should still be called exactly once after timeout');
                    done();
                }, 10);
            })
        );
    });

    })