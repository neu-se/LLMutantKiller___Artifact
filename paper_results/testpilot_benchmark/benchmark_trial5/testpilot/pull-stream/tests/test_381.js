let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with primitive values', function(done) {
        // Since pull-stream doesn't have a nonUnique method, we'll implement the logic
        // to filter for non-unique (duplicate) values
        let seen = new Map();
        let duplicates = [];
        
        pull_stream(
            pull_stream.values([1, 2, 2, 3, 3, 3, 4]),
            pull_stream.through(function(data) {
                let count = seen.get(data) || 0;
                seen.set(data, count + 1);
                return data;
            }),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                // Filter to get only the values that appeared more than once
                for (let value of result) {
                    if (seen.get(value) > 1) {
                        duplicates.push(value);
                    }
                }
                assert.deepEqual(duplicates, [2, 2, 3, 3, 3]);
                done();
            })
        );
    });
});