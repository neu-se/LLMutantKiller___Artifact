let assert = require('assert');
let pull_stream = require('pull-stream');

// Custom nonUnique transform that filters for duplicate values based on a nested field path
function nonUnique(path) {
    const seen = new Set();
    const duplicates = [];
    
    return pull_stream.through(function(data) {
        // Get nested property value using dot notation
        const value = path.split('.').reduce((obj, key) => obj && obj[key], item);
                return itemValue === value;
            })) {
                // Add the first occurrence to duplicates
                duplicates.push(data);
            } else {
                duplicates.push(data);
            }
        } else {
            seen.add(value);
        }
    }, function(end) {
        // At the end, emit only the duplicates
        duplicates.forEach(item => this.queue(item));
        this.queue(null);
    });
}

// Add the nonUnique method to pull_stream
pull_stream.nonUnique = nonUnique;

// Test function
function testPullStreamNonUnique() {
    console.log('Testing pull-stream nonUnique with nested field...');
    
    const data = [
        { user: { id: 1 }, value: 'a' },
        { user: { id: 2 }, value: 'b' },
        { user: { id: 1 }, value: 'c' },
        { user: { id: 3 }, value: 'd' }
    ];
    
    pull_stream(
        pull_stream.values(data),
        pull_stream.nonUnique('user.id'),
        pull_stream.collect(function(err, result) {
            assert.ifError(err);
            assert.equal(result.length, 2);
            assert.deepEqual(result, [
                { user: { id: 1 }, value: 'a' },
                { user: { id: 1 }, value: 'c' }
            ]);
            console.log('Test passed!');
        })
    );
}

// Run the test
testPullStreamNonUnique();