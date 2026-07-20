let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.asyncMap with basic transformation', function(done) {
        // Test basic async transformation
        const asyncDouble = (value, callback) => {
            setTimeout(() => {
                callback(null, value * 2);
            }, 10);
        };

        pull_stream(
            pull_stream.values([1, 2, 3]),
            pull_stream.asyncMap(asyncDouble),
            pull_stream.collect((err, results) => {
                assert.strictEqual(err, null);
                assert.deepStrictEqual(results, [2, 4, 6]);
                done();
            })
        );
    });

    })