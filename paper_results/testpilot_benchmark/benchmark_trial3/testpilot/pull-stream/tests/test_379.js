let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.flatten with single values', function(done) {
        const source = pull_stream.values([
            'hello',
            'world',
            42
        ]);
        
        pull_stream(
            source,
            pull_stream.flatten(),
            pull_stream.collect(function(err, results) {
                assert.ifError(err);
                assert.deepEqual(results, ['hello', 'world', 42]);
                done();
            })
        );
    });

    })