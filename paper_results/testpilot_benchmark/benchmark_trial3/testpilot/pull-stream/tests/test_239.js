let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filter that filters nothing', function(done) {
        const source = pull_stream.values([1, 2, 3]);
        const filter = pull_stream.filter(x => true); // filter nothing
        const results = [];
        
        pull_stream(
            source,
            filter,
            pull_stream.drain(
                item => results.push(item),
                err => {
                    if (err) return done(err);
                    assert.deepEqual(results, [1, 2, 3]);
                    done();
                }
            )
        );
    });
});