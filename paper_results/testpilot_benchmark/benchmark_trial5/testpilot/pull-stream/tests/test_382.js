let assert = require('assert');
let pull_stream = require('pull-stream');

// Custom nonUnique transform that only passes through duplicate values
function nonUnique() {
    let seen = new Set();
    let duplicates = new Set();
    
    return pull_stream.through(function(data) {
        if (seen.has(data)) {
            duplicates.add(data);
            return data;
        } else {
            seen.add(data);
            return null; // Filter out unique values
        }
    });
}

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with all unique values', function(done) {
        let input = [1, 2, 3, 4, 5];
        let expected = [];
        
        pull_stream(
            pull_stream.values(input),
            nonUnique(),
            pull_stream.filter(x => x !== null),
            pull_stream.collect(function(err, data) {
                if (err) return done(err);
                assert.deepEqual(data, expected);
                done();
            })
        );
    });
});