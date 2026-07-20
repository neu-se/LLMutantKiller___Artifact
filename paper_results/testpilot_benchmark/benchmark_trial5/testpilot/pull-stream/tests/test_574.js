let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.concat with error in stream', function(done) {
        const testError = new Error('test error');
        
        pull_stream(
            function(end, cb) {
                if (end) return cb(end);
                cb(testError);
            },
            pull_stream.concat(function(err, result) {
                assert.strictEqual(err, testError);
                assert.strictEqual(result, undefined);
                done();
            })
        );
    });
});