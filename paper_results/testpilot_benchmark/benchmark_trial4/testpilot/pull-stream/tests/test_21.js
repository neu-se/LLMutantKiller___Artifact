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
                // If pipeline is a single function, treat it as a complete pipeline
                return transform(pipeline);
            } else {
                // If pipeline is the result of pull_stream, compose with transform
                return pull_stream(transform, pipeline);
            }
        };
    }
    
    // Full pipeline execution
    let pipeline = args[0];
    
    for (let i = 1; i < args.length; i++) {
        if (typeof args[i] === 'function') {
            pipeline = args[i](pipeline);
        }
    }
    
    return pipeline;
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

    function createTransform(transformFn) {
        return function(read) {
            return function(end, cb) {
                read(end, function(end, data) {
                    if (end) return cb(end);
                    cb(null, transformFn(data));
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
        
        const source = createSource([1, 2, 3]);
        const sink = createSink((err, results) => {
            assert.strictEqual(err, null);
            assert.deepStrictEqual(results, [11, 12, 13]);
            done();
        });

        partialPull(pull_stream(source, sink));
    });
});