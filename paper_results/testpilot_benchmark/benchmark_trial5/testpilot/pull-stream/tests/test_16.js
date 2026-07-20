// Simple assert implementation
const assert = {
    strictEqual: (actual, expected, message) => {
        if (actual !== expected) {
            throw new Error(message || `Expected ${expected}, got ${actual}`);
        }
    },
    deepStrictEqual: (actual, expected, message) => {
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
            throw new Error(message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
        }
    }
};

// Pull-stream implementation
function pull_stream(...args) {
    if (args.length === 0) {
        return pull_stream;
    }
    
    if (args.length === 1) {
        return args[0];
    }
    
    // For length 2, 3, 4, or default case, we compose the functions
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

    it('should handle different argument lengths in partial application', function(done) {
        // Test case 2 (length = 2)
        const transform1 = createTransform(x => x * 2);
        const partial2 = pull_stream(transform1);
        
        // Test case 3 (length = 3)
        const transform2 = createTransform(x => x + 1);
        const partial3 = pull_stream(transform1, transform2);
        
        // Test case 4 (length = 4)
        const transform3 = createTransform(x => x * 10);
        const partial4 = pull_stream(transform1, transform2, transform3);
        
        // Test default case (length > 4)
        const transform4 = createTransform(x => x + 100);
        const transform5 = createTransform(x => x - 50);
        const partialDefault = pull_stream(transform1, transform2, transform3, transform4, transform5);
        
        const source = createSource([1]);
        const sink = createSink((err, results) => {
            assert.strictEqual(err, null);
            // ((((1 * 2) + 1) * 10) + 100) - 50 = ((3 * 10) + 100) - 50 = 380
            assert.deepStrictEqual(results, [380]);
            done();
        });

        partialDefault(pull_stream(source, sink));
    });
});

// Simple test runner
function describe(name, fn) {
    console.log(`\n${name}`);
    fn();
}

function 