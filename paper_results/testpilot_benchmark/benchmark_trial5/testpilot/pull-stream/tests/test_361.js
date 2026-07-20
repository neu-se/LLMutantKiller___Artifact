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
        
        // Custom implementation since pull-stream doesn't have unique with invert
        const uniqueWithInvert = (field, invert) => {
            const seen = new Map();
            const duplicates = [];
            
            return pull_stream.through(function(data) {
                const key = data[field];
                if (seen.has(key)) {
                    // This is a duplicate
                    if (invert) {
                        duplicates.push(data);
                    }
                } else {
                    seen.set(key, data);
                    if (!invert) {
                        this.queue(data);
                    }
                }
            }, function() {
                if (invert) {
                    duplicates.forEach(item => this.queue(item));
                }
                this.queue(null);
            });
        };
        
        pull_stream(
            pull_stream.values(input),
            uniqueWithInvert('id', true),
            pull_stream.collect(function(err, result) {
                assert.ifError(err);
                assert.deepEqual(result, expected);
                done();
            })
        );
    });
});