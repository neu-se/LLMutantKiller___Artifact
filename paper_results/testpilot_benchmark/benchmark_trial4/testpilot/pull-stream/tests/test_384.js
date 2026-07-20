let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.flatten with empty input', function(done) {
        let input = [];
        let expected = [];
        
        pull_stream(
            pull_stream.values(input),
            pull_stream.flatten(),
            pull_stream.collect(function(err, data) {
                if (err) return done(err);
                assert.deepEqual(data, expected);
                done();
            })
        );
    });

    })