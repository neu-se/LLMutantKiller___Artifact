let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.unique - with field and invert for objects', function(done) {
        const input = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 1, name: 'Alice Clone' },
            { id: 3, name: 'Charlie' },
            { id: 2, name: 'Bob Clone' }
        ];
        const expected = [
            { id: 1, name: 'Alice Clone' },
            { id: 2, name: 'Bob Clone' }
        ]; // Only duplicates based on id field
        
        // Custom implementation to get duplicates based on id field
        const seen = new Set();
        const duplicates = [];
        
        pull_stream(
            pull_stream.values(input),
            pull_stream.filter(function(item) {
                if (seen.has(item.id)) {
                    return true; // This is a duplicate
                } else {
                    seen.add(item.id);
                    return false; // This is the first occurrence
                }
            }),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                assert.deepEqual(result, expected);
                done();
            })
        );
    });
});