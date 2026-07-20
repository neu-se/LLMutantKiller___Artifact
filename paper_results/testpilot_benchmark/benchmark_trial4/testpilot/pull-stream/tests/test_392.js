let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.flatten abort functionality', function(done) {
        const source = pull_stream.values([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]);
        
        const result = [];
        const stream = pull_stream(
            source,
            pull_stream.flatten(),
            pull_stream.drain(function(data) {
                result.push(data);
                if (result.length === 3) {
                    // Abort after collecting 3 items
                    return false;
                }
            }, function(err) {
                assert.strictEqual(err, false); // aborted
                assert.deepStrictEqual(result, [1, 2, 3]);
                done();
            })
        );
    });
});