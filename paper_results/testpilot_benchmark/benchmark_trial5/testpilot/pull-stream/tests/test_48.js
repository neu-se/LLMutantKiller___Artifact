let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.once - should work without onAbort callback', function(done) {
        const testValue = 123;
        let receivedValues = [];
        
        pull_stream(
            pull_stream.once(testValue), // No onAbort callback
            pull_stream.drain(
                function(data) {
                    receivedValues.push(data);
                },
                function(err) {
                    assert.strictEqual(err, null);
                    assert.strictEqual(receivedValues.length, 1);
                    assert.strictEqual(receivedValues[0], testValue);
                    done();
                }
            )
        );
    });
});