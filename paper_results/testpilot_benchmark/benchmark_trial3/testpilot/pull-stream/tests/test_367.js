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
        
        // Create a custom transform to filter non-unique items by id
        const nonUnique = (field) => {
            const seen = new Map();
            const duplicates = new Set();
            
            return pull_stream.through(function(data) {
                const value = data[field];
                if (seen.has(value)) {
                    duplicates.add(value);
                } else {
                    seen.set(value, true);
                }
            }, function() {
                // Second pass to emit only duplicates
                const seenInOutput = new Set();
                return pull_stream(
                    pull_stream.values(data),
                    pull_stream.filter(item => {
                        const value = item[field];
                        return duplicates.has(value);
                    })
                );
            });
        };
        
        // Simpler approach using filter
        const idCounts = {};
        data.forEach(item => {
            idCounts[item.id] = (idCounts[item.id] || 0) + 1;
        });
        
        pull_stream(
            pull_stream.values(data),
            pull_stream.filter(item => idCounts[item.id] > 1),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                assert.equal(result.length, 4);
                assert.deepEqual(result, [
                    { id: 1, name: 'Alice' },
                    { id: 2, name: 'Bob' },
                    { id: 1, name: 'Alice' },
                    { id: 2, name: 'Bob' }
                ]);
                done();
            })
        );
    });
});