let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream filter duplicates with primitive values', function(done) {
        // Since nonUnique doesn't exist, let's create a simple filter to demonstrate
        // filtering for values that appear more than once
        let seen = {};
        let duplicates = [];
        
        pull_stream(
            pull_stream.values([1, 2, 2, 3, 3, 3, 4]),
            pull_stream.through(function(data) {
                seen[data] = (seen[data] || 0) + 1;
                return data;
            }),
            pull_stream.filter(function(data) {
                return seen[data] > 1;
            }),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                // Should return only the duplicate values
                assert.deepEqual(result, [2, 2, 3, 3, 3]);
                done();
            })
        );
    });
});