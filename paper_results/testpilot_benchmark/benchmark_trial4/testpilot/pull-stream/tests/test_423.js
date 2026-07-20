let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should handle errors from source', function(done) {
        let testError = new Error('test error');
        let source = function(end, cb) {
            if (end) return cb(end);
            cb(testError);
        };
        let sink = pull_stream.drain(
            function(data) {
                // Should not be called
                assert.fail('op should not be called on error');
            },
            function(err) {
                assert.strictEqual(err, testError);
                done();
            }
        );
        pull_stream(source, sink);
    });

    })