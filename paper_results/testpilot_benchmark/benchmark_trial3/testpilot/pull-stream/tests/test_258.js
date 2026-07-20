let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.filterNot with boolean values', function(done) {
        const source = pull_stream.values([true, false, true, false, true]);
        const isTruthy = (val) => val;
        const result = [];
        
        pull_stream(
            source,
            pull_stream.filterNot(isTruthy),
            pull_stream.drain(
                (data) => result.push(data),
                (err) => {
                    if (err) return done(err);
                    assert.deepEqual(result, [false, false]);
                    done();
                }
            )
        );
    });
});