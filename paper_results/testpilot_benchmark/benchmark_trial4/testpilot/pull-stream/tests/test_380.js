let assert = require('assert');
let pull_stream = require('pull-stream');

// Custom nonUnique transform that returns only duplicate values
function nonUnique() {
    let seen = new Map();
    let duplicates = [];
    
    return pull_stream.through(function(data) {
        if (seen.has(data)) {
            if (seen.get(data) === 1) {
                // First time seeing a duplicate, add the original
                duplicates.push(data);
                seen.set(data, 2);
            }
            // Add this duplicate occurrence
            duplicates.push(data);
        } else {
            seen.set(data, 1);
        }
    }, function(end) {
        if (end === true) {
            // Push all duplicates when stream ends
            for (let dup of duplicates) {
                this.queue(dup);
            }
        }
        this.queue(end);
    });
}

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with primitive values', function(done) {
        let input = [1, 2, 2, 3, 1, 4, 3, 5];
        let expected = [2, 2, 1, 3];
        let result = [];
        
        pull_stream(
            pull_stream.values(input),
            nonUnique(),
            pull_stream.collect(function(err, data) {
                if (err) return done(err);
                assert.deepEqual(data, expected);
                done();
            })
        );
    });
});