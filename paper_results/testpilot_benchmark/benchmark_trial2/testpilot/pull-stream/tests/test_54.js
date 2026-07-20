let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with primitive values', function(done) {
        let input = [1, 2, 2, 3, 3, 3, 4];
        let expected = [2, 2, 3, 3, 3];
        let result = [];
        
        // Count occurrences of each value
        let counts = {};
        input.forEach(val => {
            counts[val] = (counts[val] || 0) + 1;
        });
        
        pull_stream(
            pull_stream.values(input),
            pull_stream.filter(function(val) {
                return counts[val] > 1; // Keep only values that appear more than once
            }),
            pull_stream.collect(function(err, data) {
                if (err) return done(err);
                assert.deepEqual(data, expected);
                done();
            })
        );
    });
});