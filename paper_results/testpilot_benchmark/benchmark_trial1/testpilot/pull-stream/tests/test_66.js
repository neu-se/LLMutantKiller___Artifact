let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.log with simple values', function(done) {
        let loggedValues = [];
        
        // Mock console.log to capture output
        const originalLog = console.log;
        console.log = function(...args) {
            loggedValues.push(args);
        };
        
        // Create a custom log through stream
        const log = function() {
            return pull_stream.through(function(data) {
                console.log(data);
                return data;
            });
        };
        
        pull_stream(
            pull_stream.values([1, 2, 3]),
            log(),
            pull_stream.drain(null, function(err) {
                // Restore console.log
                console.log = originalLog;
                
                assert.equal(err, null);
                assert.equal(loggedValues.length, 3);
                assert.deepEqual(loggedValues[0], [1]);
                assert.deepEqual(loggedValues[1], [2]);
                assert.deepEqual(loggedValues[2], [3]);
                done();
            })
        );
    });
});