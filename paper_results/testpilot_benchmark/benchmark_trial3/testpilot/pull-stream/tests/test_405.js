let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should handle abort with error', function(done) {
        let testError = new Error('abort error');
        let source = pull_stream.values([1, 2, 3, 4, 5]);
        let drain = pull_stream.drain(
            function(data) {
                if (data === 2) {
                    drain.abort(testError);
                }
            },
            function(err) {
                assert.strictEqual(err, testError);
                done();
            }
        );
        pull_stream(source, drain);
    });

    })