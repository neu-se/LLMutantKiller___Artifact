let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.collect with simple values', function(done) {
        pull_stream(
            pull_stream.values([1, 2, 3, 4, 5]),
            pull_stream.collect(function (err, array) {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(array, [1, 2, 3, 4, 5]);
                done();
            })
        );
    });

    })