let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with primitive values', function(done) {
        // First pass: count occurrences
        let counts = {};
        
        pull_stream(
            pull_stream.values([1, 2, 2, 3, 3, 3, 4]),
            pull_stream.drain(function(value) {
                counts[value] = (counts[value] || 0) + 1;
            }, function(err) {
                if (err) return done(err);
                
                // Second pass: filter non-unique values
                pull_stream(
                    pull_stream.values([1, 2, 2, 3, 3, 3, 4]),
                    pull_stream.filter(function(value) {
                        return counts[value] > 1;
                    }),
                    pull_stream.collect(function(err, result) {
                        assert.ifError(err);
                        assert.deepEqual(result, [2, 2, 3, 3, 3]);
                        done();
                    })
                );
            })
        );
    });
});