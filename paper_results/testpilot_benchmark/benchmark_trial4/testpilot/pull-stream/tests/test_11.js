let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

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

    })