let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.keys with simple object', function(done) {
        const testObject = { a: 1, b: 2, c: 3 };
        const expectedKeys = ['a', 'b', 'c'];
        const actualKeys = [];
        
        pull_stream(
            pull_stream.keys(testObject),
            pull_stream.collect(function(err, keys) {
                if (err) return done(err);
                assert.deepEqual(keys.sort(), expectedKeys.sort());
                done();
            })
        );
    });

    })