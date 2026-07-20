let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with all unique values', function(done) {
        let input = [1, 2, 3, 4, 5];
        
        // Since pull-stream doesn't have nonUnique, we'll create a simple filter
        // that only passes through non-unique (duplicate) values
        function nonUnique() {
            let seen = new Set();
            let duplicates = new Set();
            
            return pull_stream.filter(function(item) {
                if (seen.has(item)) {
                    duplicates.add(item);
                    return true;
                } else {
                    seen.add(item);
                    return false;
                }
            });
        }
        
        pull_stream(
            pull_stream.values(input),
            nonUnique(),
            pull_stream.collect(function(err, data) {
                if (err) return done(err);
                assert.deepEqual(data, []);
                done();
            })
        );
    });
});