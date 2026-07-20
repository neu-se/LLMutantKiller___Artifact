let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.log with object values', function(done) {
        let loggedValues = [];
        const testObjects = [{id: 1, name: 'test'}, {id: 2, name: 'example'}];
        
        const originalLog = console.log;
        console.log = function(...args) {
            loggedValues.push(args);
        };
        
        pull_stream(
            pull_stream.values(testObjects),
            pull_stream.log(),
            pull_stream.drain(null, function(err) {
                console.log = originalLog;
                
                assert.equal(err, null);
                assert.equal(loggedValues.length, 2);
                assert.deepEqual(loggedValues[0], [testObjects[0]]);
                assert.deepEqual(loggedValues[1], [testObjects[1]]);
                done();
            })
        );
    });
});