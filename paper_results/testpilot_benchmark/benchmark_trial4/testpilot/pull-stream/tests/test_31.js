let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.keys with object containing special characters', function(done) {
        const testObject = { 
            'key-with-dash': 1,
            'key_with_underscore': 2,
            'key with space': 3,
            '123numeric': 4
        };
        
        pull_stream(
            pull_stream.keys(testObject),
            pull_stream.collect(function(err, keys) {
                if (err) return done(err);
                assert.deepEqual(keys.sort(), ['123numeric', 'key with space', 'key-with-dash', 'key_with_underscore']);
                done();
            })
        );
    });
});