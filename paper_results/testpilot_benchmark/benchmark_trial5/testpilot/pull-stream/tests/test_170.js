let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.error with Error object', function(done) {
        const testError = new Error('Test error message');
        const errorStream = pull_stream.error(testError);
        
        errorStream(false, function(err) {
            assert.strictEqual(err, testError);
            assert.strictEqual(err.message, 'Test error message');
            done();
        });
    });

    })