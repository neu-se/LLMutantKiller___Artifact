let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.asyncMap with simple transformation', function(done) {
        // Test async transformation of numbers
        const asyncDouble = (value, callback) => {
            setTimeout(() => {
                callback(null, value * 2);
            }, 10);
        };

        pull_stream(
            pull_stream.values([1, 2, 3, 4]),
            pull_stream.asyncMap(asyncDouble),
            pull_stream.collect((err, results) => {
                assert.ifError(err);
                assert.deepEqual(results, [2, 4, 6, 8]);
                done();
            })
        );
    });

    })