let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.log with empty stream', function(done) {
        let loggedValues = [];
        
        const originalLog = console.log;
        console.log = function(...args) {
            loggedValues.push(args);
        };
        
        pull_stream(
            pull_stream.values([]),
            pull_stream.through(function(data) {
                console.log(data);
                return data;
            }),
            pull_stream.drain(null, function(err) {
                console.log = originalLog;
                
                assert.equal(err, null);
                assert.equal(loggedValues.length, 0);
                done();
            })
        );
    });
});