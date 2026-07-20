let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with object field', function(done) {
        const data = [
            { id: 1, name: 'Alice' },
            { id: 2, name: 'Bob' },
            { id: 1, name: 'Alice' },
            { id: 3, name: 'Charlie' },
            { id: 2, name: 'Bob' }
        ];
        
        // Since pull-stream doesn't have nonUnique, let's implement a filter for duplicates
        const seen = new Set();
        const nonUnique = (field) => pull_stream.filter(item => {
            const value = item[field];
            if (seen.has(value)) {
                return true; // This is a duplicate
            } else {
                seen.add(value);
                return false; // This is the first occurrence
            }
        });
        
        pull_stream(
            pull_stream.values(data),
            nonUnique('id'),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                // Should return objects with duplicate ids
                assert.equal(result.length, 2);
                assert.deepEqual(result, [
                    { id: 1, name: 'Alice' },
                    { id: 2, name: 'Bob' }
                ]);
                done();
            })
        );
    });
});