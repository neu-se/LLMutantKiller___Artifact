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
        let sinkCalled = false;
        const throughObj = {
            sink: function(read) {
                sinkCalled = true;
                this._read = read;
            },
            source: function(end, cb) {
                this._read(end, function(end, data) {
                    if (end) return cb(end);
                    cb(null, data * 3);
                });
            }
        };

        const source = createSource([1, 2]);
        const sink = createSink((err, results) => {
            assert.strictEqual(err, null);
            assert.deepStrictEqual(results, [3, 6]);
            assert.strictEqual(sinkCalled, true);
            done();
        });

        pull_stream(source, throughObj, sink);
    });

});