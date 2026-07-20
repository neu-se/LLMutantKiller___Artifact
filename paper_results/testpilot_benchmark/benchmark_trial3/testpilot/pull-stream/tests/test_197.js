let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.map with number transformation', function(done) {
        const source = pull_stream.values([1, 2, 3, 4, 5]);
        const mapper = (x) => x * 2;
        const results = [];
        
        pull_stream(
            source,
            pull_stream.map(mapper),
            pull_stream.drain(
                (data) => results.push(data),
                (err) => {
                    if (err) return done(err);
                    assert.deepEqual(results, [2, 4, 6, 8, 10]);
                    done();
                }
            )
        );
    });
});