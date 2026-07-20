let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.asyncMap with error handling', function(done) {
        const source = pull_stream.values([1, 2, 3]);
        const asyncMapWithError = pull_stream.asyncMap((value, callback) => {
            if (value === 2) {
                setTimeout(() => callback(new Error('Test error')), 10);
            } else {
                setTimeout(() => callback(null, value * 2), 10);
            }
        });
        const sink = pull_stream.collect((err, results) => {
            assert(err instanceof Error);
            assert.equal(err.message, 'Test error');
            done();
        });
        
        pull_stream(source, asyncMapWithError, sink);
    });
});