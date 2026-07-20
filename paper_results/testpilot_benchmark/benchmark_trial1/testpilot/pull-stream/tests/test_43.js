let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.take with number', function(done) {
        pull_stream(
            pull_stream.values(['a', 'b', 'c', 'd', 'e']),
            pull_stream.take(3),
            pull_stream.collect((err, data) => {
                if (err) return done(err);
                assert.deepEqual(data, ['a', 'b', 'c']);
                done();
            })
        );
    });

    })