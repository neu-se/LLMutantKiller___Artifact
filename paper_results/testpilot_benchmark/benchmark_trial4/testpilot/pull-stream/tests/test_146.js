let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.infinite with constant generator', function(done) {
        const generate = () => 'hello';
        
        pull_stream(
            pull_stream.infinite(generate),
            pull_stream.take(3),
            pull_stream.collect((err, results) => {
                if (err) return done(err);
                assert.deepEqual(results, ['hello', 'hello', 'hello']);
                done();
            })
        );
    });
});