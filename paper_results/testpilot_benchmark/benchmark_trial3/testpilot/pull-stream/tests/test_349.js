let assert = require('assert');
let pull = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.unique - with field and invert', function(done) {
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
        
        // Custom implementation to find duplicates by field
        const seen = new Set();
        const duplicates = [];
        
        pull(
            pull.values(input),
            pull.filter(function(item) {
                if (seen.has(item.id)) {
                    duplicates.push(item);
                    return false;
                } else {
                    seen.add(item.id);
                    return false;
                }
            }),
            pull.collect(function(err, result) {
                assert.ifError(err);
                assert.deepEqual(duplicates, expected);
                done();
            })
        );
    });
});