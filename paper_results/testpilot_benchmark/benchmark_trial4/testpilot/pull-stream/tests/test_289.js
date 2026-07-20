let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.through with error handling', function(done) {
        let onEndCalledWithError = false;
        let errorObj = new Error('test error');
        
        let source = function(end, cb) {
            if (end) return cb(end);
            cb(errorObj);
        };
        
        let throughStream = pull_stream.through(
            function(data) {
                // This should not be called due to error
                assert.fail('op should not be called on error');
            },
            function(abort) {
                onEndCalledWithError = true;
                assert.equal(abort, errorObj);
            }
        );
        
        pull_stream(
            source,
            throughStream,
            pull_stream.collect(function(err, results) {
                assert.equal(err, errorObj);
                assert.equal(onEndCalledWithError, true);
                done();
            })
        );
    });
});