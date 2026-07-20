let assert = require('assert');
let pull = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.infinite with constant generator', function(done) {
        let values = [];
        
        pull(
            pull.infinite(() => 'hello'),
            pull.take(3),
            pull.collect((err, results) => {
                if (err) return done(err);
                assert.deepEqual(results, ['hello', 'hello', 'hello']);
                done();
            })
        );
    });
});