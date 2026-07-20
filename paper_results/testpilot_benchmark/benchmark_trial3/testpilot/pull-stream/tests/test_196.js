let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.map with string transformation', function(done) {
        const source = pull_stream.values(['hello', 'world', 'test']);
        const mapper = (str) => str.toUpperCase();
        const results = [];
        
        pull_stream(
            source,
            pull_stream.map(mapper),
            pull_stream.drain(
                (data) => results.push(data),
                (err) => {
                    if (err) return done(err);
                    assert.deepEqual(results, ['HELLO', 'WORLD', 'TEST']);
                    done();
                }
            )
        );
    });
});