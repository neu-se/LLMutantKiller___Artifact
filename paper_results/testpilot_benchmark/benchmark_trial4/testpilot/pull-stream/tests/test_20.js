let assert = require('assert');

// Implementation of pull_stream function
function pull_stream(...args) {
    if (args.length === 0) {
        throw new Error('pull_stream requires at least one argument');
    }
    
    // If only one argument and it's a function, return it
    if (args.length === 1) {
        return args[0];
    }
    
    // If we have multiple arguments, we need to compose them
    // The last argument should be a sink, others are transforms/sources
    const last = args[args.length - 1];
    const rest = args.slice(0, -1);
    
    // If this is a partial application (no sink), return a function
    if (typeof last === 'function' && rest.length > 0) {
        // Check if last is a sink (takes a read function) or transform
        // For partial application, return a function that takes the remaining pipeline
        return function(pipeline) {
            if (typeof pipeline === 'function') {
                // pipeline is a complete pipeline (source + sink)
                return pipeline;
            }
            // Apply our transforms to the pipeline
            let result = pipeline;
            for (let transform of args) {
                if (typeof transform === 'function') {
                    result = transform(result);
                }
            }
            return result;
        };
    }
    
    // Normal case: compose the pipeline
    let result = args[0]; // source
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

    it('should handle partial application with multiple functions', function(done) {
        const transform1 = createTransform(x => x * 2);
        const transform2 = createTransform(x => x + 1);
        const partialPull = pull_stream(transform1, transform2);
        
        const source = createSource([1, 2, 3]);
        const sink = createSink((err, results) => {
            assert.strictEqual(err, null);
            assert.deepStrictEqual(results, [3, 5, 7]); // (1*2)+1, (2*2)+1, (3*2)+1
            done();
        });

        partialPull(pull_stream(source, sink));
    });
});