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

    it('should handle partial application with multiple functions', function(done) {
        const transform1 = createTransform(x => x * 2);
        const transform2 = createTransform(x => x + 1);
        const partialPull = pull_stream(transform1, transform2);
        
        assert.strictEqual(typeof partialPull, 'function');
        
        const source = createSource([1, 2, 3]);
        const sink = createSink((err, results) => {
            assert.strictEqual(err, null);
            assert.deepStrictEqual(results, [3, 5, 7]); // (1*2)+1, (2*2)+1, (3*2)+1
            done();
        });

        partialPull(pull_stream(source, sink));
    });

    })