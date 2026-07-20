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

    it('should handle objects with sink and source properties', function(done) {
        let sinkResults = [];
        const throughObj = {
            sink: function(read) {
                function next() {
                    read(null, function(end, data) {
                        if (end) return;
                        sinkResults.push(data);
                        next();
                    });
                }
                next();
            },
            source: createSource([100, 200])
        };
        
        const source = createSource([1, 2]);
        const sink = createSink((err, results) => {
            assert.strictEqual(err, null);
            assert.deepStrictEqual(results, [100, 200]); // from throughObj.source
            assert.deepStrictEqual(sinkResults, [1, 2]); // consumed by throughObj.sink
            done();
        });

        pull_stream(source, throughObj, sink);
    });
});