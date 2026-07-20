let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with empty array', function(done) {
        const testArray = [];
        const results = [];
        
        pull_stream(
            pull_stream.values(testArray),
            pull_stream.drain(
                function(data) {
                    results.push(data);
                },
                function(err) {
                    assert.strictEqual(err, null);
                    assert.deepStrictEqual(results, []);
                    done();
                }
            )
        );
    });
});