let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.empty should end immediately', function(done) {
        let ended = false;
        
        pull_stream(
            pull_stream.empty(),
            pull_stream.drain(
                function(data) {
                    // Should never be called
                    assert.fail('Empty stream should not emit any data');
                },
                function(err) {
                    ended = true;
                    assert.strictEqual(err, null);
                    assert.strictEqual(ended, true);
                    done();
                }
            )
        );
    });

    })