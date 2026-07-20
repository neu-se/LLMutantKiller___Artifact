let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.keys with object containing special properties', function(done) {
        const testObject = { 
            'special-key': 'value1',
            '123': 'value2',
            'key with spaces': 'value3'
        };
        const expectedKeys = ['special-key', '123', 'key with spaces'];
        
        pull_stream(
            pull_stream.keys(testObject),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                assert.deepEqual(result.sort(), expectedKeys.sort());
                done();
            })
        );
    });
});