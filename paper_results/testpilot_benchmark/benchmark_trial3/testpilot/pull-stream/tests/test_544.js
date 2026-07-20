let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.concat with numeric strings', function(done) {
        pull_stream(
            pull_stream.values(['1', '2', '3']),
            pull_stream.concat(),
            pull_stream.drain(function(result) {
                assert.strictEqual(result, '123');
                done();
            }, function(err) {
                if (err) {
                    done(err);
                } else {
                    done();
                }
            })
        );
    });
});