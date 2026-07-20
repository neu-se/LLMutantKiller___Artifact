let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    let originalConsoleLog;
    let loggedMessages;

    beforeEach(function() {
        // Capture console.log output
        originalConsoleLog = console.log;
        loggedMessages = [];
        console.log = function(message) {
            loggedMessages.push(message);
        };
    });

    afterEach(function() {
        // Restore original console.log
        console.log = originalConsoleLog;
    });

    it('should propagate errors from upstream', function(done) {
        const testError = new Error('test error');
        
        pull_stream(
            function(end, cb) {
                if (end) return cb(end);
                cb(testError);
            },
            pull_stream.log(function(err) {
                assert.strictEqual(err, testError);
                assert.strictEqual(loggedMessages.length, 0);
                done();
            })
        );
    });
});