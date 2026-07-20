let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.onEnd with successful stream', function(done) {
        let callbackCalled = false;
        
        pull_stream(
            pull_stream.values([1, 2, 3]),
            pull_stream.onEnd(function(err) {
                callbackCalled = true;
                assert.strictEqual(err, null, 'Should not have an error');
                done();
            }),
            pull_stream.drain()
        );
        
        // Ensure callback is called
        setTimeout(() => {
            if (!callbackCalled) {
                done(new Error('onEnd callback was not called'));
            }
        }, 100);
    });

    })