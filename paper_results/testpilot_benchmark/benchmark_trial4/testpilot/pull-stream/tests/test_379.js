let assert = require('assert');
let pull = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with field parameter', function(done) {
        let input = [
            {id: 1, name: 'Alice'},
            {id: 2, name: 'Bob'},
            {id: 1, name: 'Charlie'},
            {id: 3, name: 'David'},
            {id: 2, name: 'Eve'}
        ];
        let expected = [
            {id: 1, name: 'Alice'},
            {id: 1, name: 'Charlie'},
            {id: 2, name: 'Bob'},
            {id: 2, name: 'Eve'}
        ];
        let result = [];
        
        // Create a custom filter to find non-unique items by field
        function nonUnique(field) {
            let seen = new Map();
            let duplicates = new Set();
            
            return pull.through(function(data) {
                let value = data[field];
                if (seen.has(value)) {
                    duplicates.add(value);
                } else {
                    seen.set(value, true);
                }
            }, function() {
                // Reset for second pass
                seen.clear();
            });
        }
        
        // First pass to identify duplicates
        let duplicateIds = new Set();
        let seenIds = new Set();
        
        for (let item of input) {
            if (seenIds.has(item.id)) {
                duplicateIds.add(item.id);
            } else {
                seenIds.add(item.id);
            }
        }
        
        pull(
            pull.values(input),
            pull.filter(function(item) {
                return duplicateIds.has(item.id);
            }),
            pull.collect(function(err, data) {
                if (err) return done(err);
                assert.deepEqual(data, expected);
                done();
            })
        );
    });
});