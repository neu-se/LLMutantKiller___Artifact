let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.onEnd with empty stream', function(done) {
        pull_stream(
            pull_stream.empty(),
            pull_stream.onEnd(function(err) {
                assert.strictEqual(err, null, 'Should not have an error for empty stream');
                done();
            }),
            pull_stream.drain()
        );
    });

    })