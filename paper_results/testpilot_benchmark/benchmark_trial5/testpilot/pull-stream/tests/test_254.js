let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filter with strings', function(done) {
        const source = pull_stream.values(['apple', 'banana', 'cherry', 'date', 'elderberry']);
        const filter = pull_stream.filter(str => str.length > 5); // filter strings longer than 5 chars
        const results = [];
        
        pull_stream(
            source,
            filter,
            pull_stream.drain(
                item => results.push(item),
                err => {
                    if (err) return done(err);
                    assert.deepEqual(results, ['banana', 'cherry', 'elderberry']);
                    done();
                }
            )
        );
    });
});