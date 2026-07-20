let assert = require('assert');
let pull_stream = require('pull-stream');

// Helper function to get nested property value
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current && current[key], obj);
}

// Custom transform to filter non-unique items based on a field path
function nonUnique(fieldPath) {
    const seen = new Map();
    const duplicates = [];
    
    return pull_stream.through(function(data) {
        const value = getNestedValue(data, fieldPath);
        
        if (seen.has(value)) {
            // If we've seen this value before, add both the original and current to duplicates
            if (seen.get(value) !== null) {
                duplicates.push(seen.get(value));
                seen.set(value, null); // Mark as already added to duplicates
            }
            duplicates.push(data);
        } else {
            seen.set(value, data);
        }
    }, function(end) {
        // Emit all duplicates at the end
        duplicates.forEach(item => this.queue(item));
        this.queue(end);
    });
}

it('.').reduce((current, key) => current && current[key], obj);
}

// Custom transform to filter non-unique items based on a field path
function nonUnique(fieldPath) {
    const seen = new Map();
    const duplicates = [];
    
    return pull_stream.through(function(data) {
        const value = getNestedValue(data, fieldPath);
        
        if (seen.has(value)) {
            // If we've seen this value before, add both the original and current to duplicates
            if (seen.get(value) !== null) {
                duplicates.push(seen.get(value));
                seen.set(value, null); // Mark as already added to duplicates
            }
            duplicates.push(data);
        } else {
            seen.set(value, data);
        }
    }, function(end) {
        // Emit all duplicates at the end
        duplicates.forEach(item => this.queue(item));
        this.queue(end);
    });
}

it('test pull-stream.nonUnique with nested field', function(done) {
        const data = [
            { user: { id: 1 }, value: 'a' },
            { user: { id: 2 }, value: 'b' },
            { user: { id: 1 }, value: 'c' },
            { user: { id: 3 }, value: 'd' }
        ];
        
        pull_stream(
            pull_stream.values(data),
            nonUnique('user.id'),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                // Should return objects with duplicate user.id values
                assert.equal(result.length, 2);
                assert.deepEqual(result, [
                    { user: { id: 1 }, value: 'a' },
                    { user: { id: 1 }, value: 'c' }
                ]);
                done();
            })
        );
    });
});