let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.asyncMap with immediate callback', function(done) {
        const source = pull_stream.values([10, 20, 30]);
        const asyncMap = pull_stream.asyncMap((value, callback) => {
            // Call callback immediately without setTimeout
            callback(null, value / 10);
        });
        
        const results = [];
        pull_stream(
            source,
            asyncMap,
            pull_stream.drain(
                (data) => results.push(data),
                (err) => {
                    assert.ifError(err);
                    assert.deepEqual(results, [1, 2, 3]);
                    done();
                }
            )
        );
    });
});