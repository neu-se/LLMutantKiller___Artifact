let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.infinite can be terminated early', function(done) {
        const generate = () => 'infinite';
        let count = 0;
        
        pull_stream(
            pull_stream.infinite(generate),
            pull_stream.take(5), // Use take to limit the stream to 5 items
            pull_stream.collect((err, results) => {
                if (err) return done(err);
                assert.strictEqual(results.length, 5);
                assert(results.every(item => item === 'infinite'));
                done();
            })
        );
    });
});