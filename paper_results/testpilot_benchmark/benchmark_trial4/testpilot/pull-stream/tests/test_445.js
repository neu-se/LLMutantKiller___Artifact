let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.onEnd with stream that ends normally', function(done) {
        let endReceived = false;
        
        pull_stream(
            pull_stream.values(['a', 'b', 'c']),
            pull_stream.onEnd(function(err) {
                endReceived = true;
                assert.strictEqual(err, null, 'Should receive null when stream ends normally');
                assert.strictEqual(typeof err, 'object', 'Error should be null (object type)');
                done();
            }),
            pull_stream.drain()
        );
    });
});