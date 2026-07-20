let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.log with basic values', function(done) {
        let loggedValues = [];
        let originalConsoleLog = console.log;
        
        // Mock console.log to capture output
        console.log = function(value) {
            loggedValues.push(value);
        };
        
        pull_stream(
            pull_stream.values([1, 2, 3]),
            pull_stream.log(function(err) {
                // Restore original console.log
                console.log = originalConsoleLog;
                
                if (err) return done(err);
                
                assert.deepEqual(loggedValues, [1, 2, 3]);
                done();
            })
        );
    });
    
    })