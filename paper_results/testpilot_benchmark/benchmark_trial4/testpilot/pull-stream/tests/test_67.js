let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.once - should emit single value and end', function(done) {
        const testValue = 'hello world';
        let receivedValues = [];
        
        pull_stream(
            pull_stream.once(testValue),
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