let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with string array', function(done) {
        pull_stream(
            pull_stream.values(['a', 'b', 'c']),
            pull_stream.collect(function (err, results) {
                assert.strictEqual(err, null);
                assert.deepEqual(results, ['a', 'b', 'c']);
                done();
            })
        );
    });

    })