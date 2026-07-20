let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.infinite can be terminated early', function(done) {
        let callCount = 0;
        const generate = () => {
            callCount++;
            return callCount;
        };
        
        pull_stream(
            pull_stream.infinite(generate),
            pull_stream.take(2),
            pull_stream.drain(null, (err) => {
                if (err) return done(err);
                // Generator should only be called for the items we took
                assert(callCount <= 3); // Allow for one extra call due to pull-stream internals
                done();
            })
        );
    });
});