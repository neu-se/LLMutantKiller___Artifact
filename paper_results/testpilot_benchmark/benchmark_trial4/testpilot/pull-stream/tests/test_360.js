let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with primitive values', function(done) {
        let input = [1, 2, 2, 3, 1, 4, 3, 5];
        let expected = [2, 2, 1, 3];
        let result = [];
        
        pull_stream(
            pull_stream.values(input),
            pull_stream.nonUnique(),
            pull_stream.collect(function(err, data) {
                if (err) return done(err);
                assert.deepEqual(data, expected);
                done();
            })
        );
    });

    })