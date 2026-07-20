let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.map with identity function', function(done) {
        const source = pull_stream.values([1, 'hello', { key: 'value' }, null]);
        const mapper = (x) => x;
        const results = [];
        
        pull_stream(
            source,
            pull_stream.map(mapper),
            pull_stream.drain(
                (data) => results.push(data),
                (err) => {
                    if (err) return done(err);
                    assert.deepEqual(results, [1, 'hello', { key: 'value' }, null]);
                    done();
                }
            )
        );
    });
});