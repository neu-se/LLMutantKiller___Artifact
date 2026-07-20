let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.asyncMap with basic transformation', function(done) {
        const source = pull_stream.values([1, 2, 3]);
        const asyncDouble = pull_stream.asyncMap((value, callback) => {
            setTimeout(() => callback(null, value * 2), 10);
        });
        const sink = pull_stream.collect((err, results) => {
            assert.strictEqual(err, null);
            assert.deepStrictEqual(results, [2, 4, 6]);
            done();
        });
        
        pull_stream(source, asyncDouble, sink);
    });
});