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

    it('should handle more than 4 arguments (default case)', function(done) {
        const source = createSource([1]);
        const t1 = createTransform(x => x + 1);
        const t2 = createTransform(x => x + 1);
        const t3 = createTransform(x => x + 1);
        const t4 = createTransform(x => x + 1);
        const t5 = createTransform(x => x + 1);
        
        const sink = createSink((err, results) => {
            assert.strictEqual(err, null);
            assert.deepStrictEqual(results, [6]); // 1+1+1+1+1+1
            done();
        });

        pull_stream(source, t1, t2, t3, t4, t5, sink);
    });
});