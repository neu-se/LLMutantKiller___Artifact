let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should handle abort with custom error', function(done) {
        let customError = new Error('custom abort');
        let source = pull_stream.values([1, 2, 3]);
        let sink = pull_stream.drain(
            function(data) {
                if (data === 1) {
                    sink.abort(customError);
                }
            },
            function(err) {
                assert.strictEqual(err, customError);
                done();
            }
        );
        pull_stream(source, sink);
    });

    })