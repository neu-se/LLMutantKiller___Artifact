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
        
        // Create a sink that will abort after reading 2 items
        let readCount = 0;
        const abortingSink = pull_stream.drain(
            (data) => {
                readCount++;
                if (readCount >= 2) {
                    return false; // This will cause the stream to abort
                }
                return true;
            },
            (err) => {
                // The stream should end normally when we return false from drain
                assert.equal(err, null);
                assert.equal(readCount, 2);
                // Should have processed at least 2 items
                assert(mapCallCount >= 2);
                done();
            }
        );
        
        pull_stream(source, asyncMap, abortingSink);
    });
});