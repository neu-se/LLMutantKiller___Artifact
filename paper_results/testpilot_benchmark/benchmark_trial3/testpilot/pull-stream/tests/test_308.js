let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.take with predicate that never fails', function(done) {
        pull_stream(
            pull_stream.values([1, 2, 3]),
            pull_stream.take(n => n > 0, { last: false }),
            pull_stream.collect((err, data) => {
                assert.ifError(err);
                assert.deepEqual(data, [1, 2, 3]);
                done();
            })
        );
    });

    })