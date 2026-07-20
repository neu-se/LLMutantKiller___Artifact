let assert = require('assert');
let pull = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.keys with nested object', function(done) {
        const testObject = { 
            name: 'test', 
            nested: { inner: 'value' }, 
            array: [1, 2, 3],
            number: 42
        };
        const expectedKeys = ['name', 'nested', 'array', 'number'];
        
        pull(
            pull.keys(testObject),
            pull.collect(function(err, keys) {
                if (err) return done(err);
                assert.deepEqual(keys.sort(), expectedKeys.sort());
                done();
            })
        );
    });
});