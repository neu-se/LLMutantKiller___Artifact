let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.once - should emit single value', function(done) {
        const testValue = 'hello world';
        
        pull_stream(
            pull_stream.once(testValue),
            pull_stream.collect((err, results) => {
                assert.strictEqual(err, null);
                assert.strictEqual(results.length, 1);
                assert.strictEqual(results[0], testValue);
                done();
            })
        );
    });

    })