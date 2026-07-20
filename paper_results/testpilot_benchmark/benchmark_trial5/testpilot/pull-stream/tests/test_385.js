let assert = require('assert');
let pull_stream = require('pull-stream');

// Custom nonUnique filter function
function nonUnique(field) {
    return pull_stream.through(function(read) {
        let seen = new Map();
        let buffer = [];
        
        return function(end, cb) {
            if (end) return read(end, cb);
            
            read(null, function next(end, data) {
                if (end) {
                    // Process buffer to find non-unique items
                    let result = [];
                    for (let item of buffer) {
                        let key = typeof field === 'function' ? field(item) : item[field];
                        if (seen.get(key) > 1) {
                            result.push(item);
                        }
                    }
                    
                    // Send all non-unique items
                    let index = 0;
                    function sendNext() {
                        if (index >= result.length) {
                            return cb(true);
                        }
                        cb(null, result[index++]);
                    }
                    return sendNext();
                }
                
                // Count occurrences
                let key = typeof field === 'function' ? field(data) : data[field];
                seen.set(key, (seen.get(key) || 0) + 1);
                buffer.push(data);
                
                read(null, next);
            });
        };
    });
}

describe('test pull_stream', function() {
    it('test pull-stream.nonUnique with object field', function(done) {
        let input = [
            {id: 1, name: 'Alice'},
            {id: 2, name: 'Bob'},
            {id: 2, name: 'Bob'},
            {id: 3, name: 'Charlie'},
            {id: 3, name: 'Charlie'},
            {id: 4, name: 'David'}
        ];
        let expected = [
            {id: 2, name: 'Bob'},
            {id: 2, name: 'Bob'},
            {id: 3, name: 'Charlie'},
            {id: 3, name: 'Charlie'}
        ];
        let result = [];
        
        pull_stream(
            pull_stream.values(input),
            nonUnique('id'),
            pull_stream.collect(function(err, data) {
                if (err) return done(err);
                assert.deepEqual(data, expected);
                done();
            })
        );
    });
});