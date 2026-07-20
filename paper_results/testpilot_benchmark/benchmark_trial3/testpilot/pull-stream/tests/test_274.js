let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.through with error handling', function(done) {
        let onEndCalledWithError = false;
        let testError = new Error('test error');
        
        let source = function(end, cb) {
            if (end) return cb(end);
            cb(testError);
        };
        
        let throughStream = pull_stream.through(
            function(data) {
                // This should not be called due to error
                assert.fail('op should not be called on error');
            },
            function(abort) {
                onEndCalledWithError = true;
                assert.equal(abort, testError);
            }
        );
        
        pull_stream(
            source,
            throughStream,
            pull_stream.collect(function(err, results) {
                assert.equal(err, testError);
                assert.equal(onEndCalledWithError, true);
                done();
            })
        );
    });

    })