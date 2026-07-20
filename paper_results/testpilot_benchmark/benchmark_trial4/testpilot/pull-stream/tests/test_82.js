let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.values with null/undefined', function(done) {
        pull_stream(
            pull_stream.values(null),
            pull_stream.collect(function (err, results) {
                assert.strictEqual(err, true);
                assert.strictEqual(results, undefined);
                done();
            })
        );
    });

    })