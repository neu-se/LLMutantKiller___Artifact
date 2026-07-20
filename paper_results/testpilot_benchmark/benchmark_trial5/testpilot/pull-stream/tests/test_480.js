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

    it('should handle empty stream', function(done) {
        pull_stream(
            pull_stream.values([]),
            pull_stream.log(function(err) {
                assert.strictEqual(err, null);
                assert.strictEqual(loggedMessages.length, 0);
                done();
            })
        );
    });

});