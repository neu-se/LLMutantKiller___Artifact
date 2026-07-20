let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.map with error in mapper function', function(done) {
        const source = pull_stream.values([1, 2, 3]);
        const mapper = x => {
            if (x === 2) throw new Error('Test error');
            return x * 2;
        };
        
        pull_stream(
            source,
            pull_stream.map(mapper),
            pull_stream.collect(function(err, results) {
                assert(err instanceof Error);
                assert.equal(err.message, 'Test error');
                done();
            })
        );
    });

    })