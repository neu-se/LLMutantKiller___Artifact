let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.asyncMap with abort', function(done) {
        let mapCallCount = 0;
        const source = pull_stream.values([1, 2, 3, 4, 5]);
        const asyncMap = pull_stream.asyncMap((value, callback) => {
            mapCallCount++;
            setTimeout(() => callback(null, value * 2), 10);
        });
        
        const abortingRead = (function() {
            let count = 0;
            return function(end, cb) {
                if (end) return cb(end);
                count++;
                if (count <= 2) {
                    source(end, cb);
                } else {
                    // Abort after reading 2 items
                    cb(new Error('Aborted'));
                }
            };
        })();
        
        const sink = pull_stream.collect((err, results) => {
            assert(err instanceof Error);
            assert.strictEqual(err.message, 'Aborted');
            // Should have processed at least some items before abort
            assert(mapCallCount >= 1);
            done();
        });
        
        pull_stream(abortingRead, asyncMap, sink);
    });

    })