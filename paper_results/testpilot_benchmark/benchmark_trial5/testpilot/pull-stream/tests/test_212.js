let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.asyncMap with empty stream', function(done) {
        const source = pull_stream.values([]);
        const asyncMap = pull_stream.asyncMap((value, callback) => {
            callback(null, value + 100);
        });
        
        const results = [];
        pull_stream(
            source,
            asyncMap,
            pull_stream.drain(
                (data) => results.push(data),
                (err) => {
                    assert.strictEqual(err, null);
                    assert.deepStrictEqual(results, []);
                    done();
                }
            )
        );
    });

    })