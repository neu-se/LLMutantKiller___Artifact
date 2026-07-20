let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.onEnd with error in stream', function(done) {
        let testError = new Error('Test error');
        
        pull_stream(
            function(end, cb) {
                if (end) return cb(end);
                cb(testError); // Simulate an error
            },
            pull_stream.onEnd(function(err) {
                assert.strictEqual(err, testError, 'Should receive the test error');
                done();
            }),
            pull_stream.drain()
        );
    });

    })