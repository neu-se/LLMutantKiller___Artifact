let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.concat with error in stream', function(done) {
        pull_stream(
            function(end, cb) {
                if (end) return cb(end);
                cb(new Error('test error'));
            },
            pull_stream.concat(function(err, result) {
                assert.ok(err instanceof Error);
                assert.strictEqual(err.message, 'test error');
                assert.strictEqual(result, undefined);
                done();
            })
        );
    });
});