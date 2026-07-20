let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.map with empty stream', function(done) {
        const source = pull_stream.values([]);
        const mapper = (x) => x * 2;
        const results = [];
        
        pull_stream(
            source,
            pull_stream.map(mapper),
            pull_stream.drain(
                (data) => results.push(data),
                (err) => {
                    if (err) return done(err);
                    assert.deepEqual(results, []);
                    done();
                }
            )
        );
    });
});