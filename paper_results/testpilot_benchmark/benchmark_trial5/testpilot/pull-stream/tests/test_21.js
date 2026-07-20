let assert = require('assert');

// Implementation of pull_stream
function pull_stream(...args) {
    if (args.length === 0) {
        return pull_stream;
    }
    
    if (args.length === 1) {
        // Partial application - return a function that takes the remaining arguments
        const transform = args[0];
        return function(pipeline) {
            if (typeof pipeline === 'function') {
                // If pipeline is a function (like another pull_stream result), call it
                return pipeline(transform);
            } else {
                // Otherwise, apply the transform to the pipeline
                return pull_stream(transform, pipeline);
            }
        };
    }
    
    // Full pipeline execution
    let source = args[0];
    let transforms = args.slice(1, -1);
    let sink = args[args.length - 1];
    
    // Apply transforms in sequence
    let current = source;
    for (let transform of transforms) {
        current = transform(current);
    }
    
    // Connect to sink
    return sink(current);
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

    it('should handle partial application with single function', function(done) {
        const transform = createTransform(x => x + 10);
        const partialPull = pull_stream(transform);
        
        assert.strictEqual(typeof partialPull, 'function');
        
        const source = createSource([1, 2, 3]);
        const sink = createSink((err, results) => {
            assert.strictEqual(err, null);
            assert.deepStrictEqual(results, [11, 12, 13]);
            done();
        });

        partialPull(pull_stream(source, sink));
    });
});