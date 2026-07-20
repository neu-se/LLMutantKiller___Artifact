let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.log with simple values', function(done) {
        // Capture console.log output
        let loggedData = [];
        let originalLog = console.log;
        console.log = function(data) {
            loggedData.push(data);
        };

        pull_stream(
            pull_stream.values([1, 2, 3]),
            pull_stream.log(function(err) {
                // Restore console.log
                console.log = originalLog;
                
                // Verify no error occurred
                assert.strictEqual(err, null);
                
                // Verify all values were logged
                assert.deepStrictEqual(loggedData, [1, 2, 3]);
                
                done();
            })
        );
    });
});