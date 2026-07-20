let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.unique - with invert flag', function(done) {
        const input = [1, 2, 2, 3, 1, 4, 3];
        const expected = [2, 1, 3]; // only duplicates
        
        pull_stream(
            pull_stream.values(input),
            pull_stream.unique(null, true),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                assert.deepEqual(result, expected);
                done();
            })
        );
    });

    })