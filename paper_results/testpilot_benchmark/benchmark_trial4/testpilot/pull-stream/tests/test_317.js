let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.take with empty stream', function(done) {
        pull_stream(
            pull_stream.values([]),
            pull_stream.take(3),
            pull_stream.collect((err, data) => {
                assert.ifError(err);
                assert.deepEqual(data, []);
                done();
            })
        );
    });
});