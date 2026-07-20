let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with array', function(done) {
        const testArray = [1, 2, 3, 'hello', 'world'];
        const source = pull_stream.values(testArray);
        const results = [];
        
        pull_stream(
            source,
            pull_stream.drain(function(data) {
                results.push(data);
            }, function(err) {
                // In pull-stream, err is null for normal end, true for end-of-stream
                assert.ok(err === null || err === true); // Accept either null or true
                assert.deepStrictEqual(results, testArray);
                done();
            })
        );
    });
});