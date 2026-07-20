let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.flatten with early abort', function(done) {
        const source = pull_stream.values([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]);
        
        let count = 0;
        pull_stream(
            source,
            pull_stream.flatten(),
            pull_stream.drain(function(data) {
                count++;
                if (count === 3) {
                    return false; // abort
                }
                return true;
            }, function(err) {
                assert.equal(count, 3);
                done();
            })
        );
    });
});