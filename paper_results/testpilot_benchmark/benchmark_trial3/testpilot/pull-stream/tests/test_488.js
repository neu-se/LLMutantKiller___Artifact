let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.reduce with empty stream', function(done) {
        pull_stream(
            pull_stream.values([]),
            pull_stream.reduce((acc, val) => acc + val, 42, (err, result) => {
                assert.strictEqual(err, null);
                assert.strictEqual(result, 42);
                done();
            })
        );
    });

    })