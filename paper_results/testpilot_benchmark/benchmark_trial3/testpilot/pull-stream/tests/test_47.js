let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.once - should work with object values', function(done) {
        const testObject = { name: 'test', value: 42 };
        let receivedValues = [];
        
        pull_stream(
            pull_stream.once(testObject),
            pull_stream.drain(
                function(data) {
                    receivedValues.push(data);
                },
                function(err) {
                    assert.strictEqual(err, null);
                    assert.strictEqual(receivedValues.length, 1);
                    assert.deepStrictEqual(receivedValues[0], testObject);
                    done();
                }
            )
        );
    });

    })