let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.flatten with nested arrays', function(done) {
        const source = pull_stream.values([
            [1, 2, 3],
            [4, 5],
            [6, 7, 8, 9]
        ]);
        
        pull_stream(
            source,
            pull_stream.flatten(),
            pull_stream.collect(function(err, results) {
                assert.ifError(err);
                assert.deepEqual(results, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
                done();
            })
        );
    });
});