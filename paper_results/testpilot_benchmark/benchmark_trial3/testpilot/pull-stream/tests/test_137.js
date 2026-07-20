let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.infinite with counter generator', function(done) {
        let counter = 0;
        const generate = () => counter++;
        
        pull_stream(
            pull_stream.infinite(generate),
            pull_stream.take(5),
            pull_stream.collect((err, results) => {
                if (err) return done(err);
                assert.deepEqual(results, [0, 1, 2, 3, 4]);
                done();
            })
        );
    });
});