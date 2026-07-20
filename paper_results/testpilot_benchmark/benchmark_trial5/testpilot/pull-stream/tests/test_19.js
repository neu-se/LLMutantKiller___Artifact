let assert = require('assert');

// Simple pull_stream implementation
function pull_stream(...args) {
    if (args.length === 1) {
        // Return a partial sink that can only be called once
        const transform = args[0];
        let called = false;
        
        return function partialSink(source) {
            if (called) {
                throw new TypeError("partial sink should only be called once!");
            }
            called = true;
            return transform(source);
        };
    }
    
    // Handle multiple arguments (full pipeline)
    let result = args[0];
    for (let i = 1; i < args.length; i++) {
        result = args[i](result);
    }
    return result;
}

describe('test pull_stream', function() {
    // Helper functions for testing
    function createSource(data) {
        let index = 0;
        return function(end, cb) {
            if (end || index >= data.length) {
                return cb(true);
            }
            cb(null, data[index++]);
        };
    }

    function createTransform(fn) {
        return function(read) {
            return function(end, cb) {
                read(end, function(end, data) {
                    if (end) return cb(end);
                    cb(null, fn(data));
                });
            };
        };
    }

    function createSink(callback) {
        let results = [];
        return function(read) {
            function next() {
                read(null, function(end, data) {
                    if (end === true) {
                        callback(null, results);
                        return;
                    }
                    if (end) {
                        callback(end);
                        return;
                    }
                    results.push(data);
                    next();
                });
            }
            next();
        };
    }

    it('should throw error when partial sink is called multiple times', function() {
        const transform = createTransform(x => x * 2);
        const partialPull = pull_stream(transform);
        const source = createSource([1, 2, 3]);
        
        // First call should work
        partialPull(source);
        
        // Second call should throw
        assert.throws(() => {
            partialPull(source);
        }, TypeError, "partial sink should only be called once!");
    });
});