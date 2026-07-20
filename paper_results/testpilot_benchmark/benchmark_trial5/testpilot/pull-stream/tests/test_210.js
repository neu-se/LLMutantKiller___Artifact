let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.asyncMap with simple transformation', function(done) {
        const source = pull_stream.values([1, 2, 3, 4, 5]);
        const asyncDouble = pull_stream.asyncMap((value, callback) => {
            // Simulate async operation with setTimeout
            setTimeout(() => {
                callback(null, value * 2);
            }, 10);
        });
        
        const results = [];
        pull_stream(
            source,
            asyncDouble,
            pull_stream.drain(
                (data) => results.push(data),
                (err) => {
                    assert.strictEqual(err, null);
                    assert.deepStrictEqual(results, [2, 4, 6, 8, 10]);
                    done();
                }
            )
        );
    });

    })