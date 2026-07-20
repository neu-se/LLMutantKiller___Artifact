let assert = require('assert');
let pull_stream = require('pull-stream');

// Custom nonUnique transform that filters for duplicate values
function nonUnique() {
    let seen = new Map();
    let duplicates = [];
    
    return pull_stream.through(function(data) {
        if (seen.has(data)) {
            seen.set(data, seen.get(data) + 1);
        } else {
            seen.set(data, 1);
        }
        return data;
    }, function(end) {
        if (end === true) {
            // On end, emit only the duplicates
            for (let [value, count] of seen) {
                if (count > 1) {
                    for (let i = 0; i < count; i++) {
                        this.queue(value);
                    }
                }
            }
        }
        this.queue(end);
    });
}

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with primitive values', function(done) {
        let input = [1, 2, 2, 3, 3, 3, 4];
        let expected = [2, 2, 3, 3, 3];
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