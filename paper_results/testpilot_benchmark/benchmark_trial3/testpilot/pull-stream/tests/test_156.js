let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.error - should work with different error types', function(done) {
        const customError = { message: 'Custom error object', code: 500 };
        
        pull_stream(
            pull_stream.error(customError),
            pull_stream.drain(
                function(data) {
                    done(new Error('Should not receive data'));
                },
                function(err) {
                    assert.strictEqual(err, customError);
                    assert.strictEqual(err.message, 'Custom error object');
                    assert.strictEqual(err.code, 500);
                    done();
                }
            )
        );
    });

    })