let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.keys with nested object', function(done) {
        const testObject = { 
            name: 'test', 
            nested: { inner: 'value' }, 
            array: [1, 2, 3],
            number: 42
        };
        
        pull_stream(
            pull_stream.keys(testObject),
            pull_stream.collect(function(err, keys) {
                if (err) return done(err);
                assert.deepEqual(keys.sort(), ['array', 'name', 'nested', 'number']);
                done();
            })
        );
    });

    })