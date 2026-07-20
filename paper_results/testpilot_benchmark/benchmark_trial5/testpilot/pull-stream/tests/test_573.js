let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.concat with string values', function(done) {
        pull_stream(
            pull_stream.values(['hello', ' ', 'world']),
            pull_stream.collect(function(err, result) {
                if (err) {
                    done(err);
                    return;
                }
                assert.strictEqual(result.join(''), 'hello world');
                done();
            })
        );
    });
});