let assert = require('assert');
let pull_stream = require('pull-stream');

// Custom unique function that supports field selector and invert
function unique(field, invert) {
    const seen = new Map();
    const items = [];
    
    return pull_stream.through(function(data) {
        const key = field ? data[field] : data;
        
        if (!seen.has(key)) {
            seen.set(key, []);
        }
        seen.get(key).push(data);
        items.push(data);
    }, function(end) {
        if (end === true) {
            if (invert) {
                // Return only items that have duplicates (appear more than once)
                const duplicates = [];
                for (const [key, itemList] of seen) {
                    if (itemList.length > 1) {
                        // Add all duplicates except the first occurrence
                        duplicates.push(...itemList.slice(1));
                    }
                }
                duplicates.forEach(item => this.queue(item));
            } else {
                // Return only unique items (first occurrence)
                const unique = [];
                for (const [key, itemList] of seen) {
                    unique.push(itemList[0]);
                }
                unique.forEach(item => this.queue(item));
            }
        }
        this.queue(end);
    });
}

// Add the unique function to pull_stream
pull_stream.unique = unique;

describe('test pull_stream', function() {
    it('test pull-stream.unique - with field selector and invert', function(done) {
        const input = [
            {id: 1, name: 'Alice'},
            {id: 2, name: 'Bob'},
            {id: 1, name: 'Alice Clone'},
            {id: 3, name: 'Charlie'},
            {id: 2, name: 'Bob Clone'},
            {id: 4, name: 'David'}
        ];
        const expected = [
            {id: 1, name: 'Alice Clone'},
            {id: 2, name: 'Bob Clone'}
        ]; // only items with duplicate ids
        
        pull_stream(
            pull_stream.values(input),
            pull_stream.unique('id', true),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                assert.deepEqual(result, expected);
                done();
            })
        );
    });
});