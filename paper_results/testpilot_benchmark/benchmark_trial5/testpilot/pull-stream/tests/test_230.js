let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.asyncMap with string transformation', function(done) {
        const source = pull_stream.values(['hello', 'world', 'test']);
        const asyncUpperCase = pull_stream.asyncMap((value, callback) => {
            // Simulate async string processing
            process.nextTick(() => {
                callback(null, value.toUpperCase());
            });
        });
        
        const results = [];
        pull_stream(
            source,
            asyncUpperCase,
            pull_stream.drain(
                (data) => results.push(data),
                (err) => {
                    assert.strictEqual(err, null);
                    assert.deepStrictEqual(results, ['HELLO', 'WORLD', 'TEST']);
                    done();
                }
            )
        );
    });
});