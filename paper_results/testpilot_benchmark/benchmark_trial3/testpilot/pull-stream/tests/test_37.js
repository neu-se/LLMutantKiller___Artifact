let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.keys with object containing special keys', function(done) {
        const testObject = { 
            '123': 'numeric key',
            'special-key': 'hyphenated',
            'with spaces': 'spaced key',
            '': 'empty string key'
        };
        const expectedKeys = ['123', 'special-key', 'with spaces', ''];
        
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