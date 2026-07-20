let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.error - should work with different error types', function(done) {
        const customError = new TypeError('Type error test');
        
        pull_stream(
            pull_stream.error(customError),
            pull_stream.drain(
                function(data) {
                    done(new Error('Should not receive data'));
                },
                function(err) {
                    assert(err instanceof TypeError);
                    assert.strictEqual(err.message, 'Type error test');
                    done();
                }
            )
        );
    });

    })