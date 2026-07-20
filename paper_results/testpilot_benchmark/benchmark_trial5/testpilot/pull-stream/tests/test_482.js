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

    it('should log single value and call done', function(done) {
        const testData = 'hello world';
        
        pull_stream(
            pull_stream.values([testData]),
            pull_stream.log(function(err) {
                assert.strictEqual(err, null);
                assert.strictEqual(loggedMessages.length, 1);
                assert.strictEqual(loggedMessages[0], testData);
                done();
            })
        );
    });

});