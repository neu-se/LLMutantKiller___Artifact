let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filter that lets everything through', function(done) {
        const source = pull_stream.values([1, 2, 3, 4, 5]);
        const filter = pull_stream.filter(x => true); // everything passes
        const results = [];
        
        pull_stream(
            source,
            filter,
            pull_stream.drain(
                item => results.push(item),
                err => {
                    if (err) return done(err);
                    assert.deepEqual(results, [1, 2, 3, 4, 5]);
                    done();
                }
            )
        );
    });
});