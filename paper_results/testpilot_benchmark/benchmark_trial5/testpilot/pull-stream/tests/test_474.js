let mocha = require('mocha');
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

    it('should log different data types', function(done) {
        const testData = [42, true, null, {key: 'value'}, [1, 2, 3]];
        
        pull_stream(
            pull_stream.values(testData),
            pull_stream.log(function(err) {
                assert.strictEqual(err, null);
                assert.strictEqual(loggedMessages.length, 5);
                assert.deepStrictEqual(loggedMessages, testData);
                done();
            })
        );
    });

    })