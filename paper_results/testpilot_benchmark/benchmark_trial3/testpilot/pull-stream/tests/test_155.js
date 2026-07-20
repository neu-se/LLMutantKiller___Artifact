let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.error - should not emit any data', function(done) {
        const testError = new Error('Another test error');
        let dataReceived = false;
        
        pull_stream(
            pull_stream.error(testError),
            pull_stream.drain(
                function(data) {
                    dataReceived = true;
                },
                function(err) {
                    assert.strictEqual(dataReceived, false);
                    assert.strictEqual(err, testError);
                    done();
                }
            )
        );
    });

    })