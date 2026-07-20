let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.error with null error', function(done) {
        const testError = null;
        const errorStream = pull_stream.error(testError);
        
        errorStream(false, function(err) {
            assert.strictEqual(err, testError);
            done();
        });
    });

    })