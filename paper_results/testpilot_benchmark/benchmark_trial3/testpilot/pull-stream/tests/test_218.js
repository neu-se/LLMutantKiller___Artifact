let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.asyncMap with string transformation', function(done) {
        const source = pull_stream.values(['hello', 'world', 'test']);
        const asyncUpperCase = pull_stream.asyncMap((str, callback) => {
            setTimeout(() => {
                callback(null, str.toUpperCase());
            }, 1);
        });
        
        const results = [];
        pull_stream(
            source,
            asyncUpperCase,
            pull_stream.drain(
                (data) => results.push(data),
                (err) => {
                    assert.ifError(err);
                    assert.deepEqual(results, ['HELLO', 'WORLD', 'TEST']);
                    done();
                }
            )
        );
    });
});