let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.onEnd callback is called only once', function(done) {
        let callCount = 0;
        
        pull_stream(
            pull_stream.values([1, 2, 3]),
            pull_stream.onEnd(function(err) {
                callCount++;
                assert.strictEqual(err, null, 'Should not have an error');
            }),
            pull_stream.drain()
        );
        
        setTimeout(() => {
            assert.strictEqual(callCount, 1, 'onEnd callback should be called exactly once');
            done();
        }, 100);
    });
});