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

    it('should support partial application with single function', function(done) {
        const transform = createTransform(x => x * 3);
        const partialPull = pull_stream(transform);
        
        assert.strictEqual(typeof partialPull, 'function');
        
        const source = createSource([2, 4]);
        const sink = createSink((err, results) => {
            assert.strictEqual(err, null);
            assert.deepStrictEqual(results, [6, 12]);
            done();
        });

        partialPull(pull_stream(source, sink));
    });

    })