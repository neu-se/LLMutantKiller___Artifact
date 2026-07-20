let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('should stop processing after finding first match', function(done) {
        let processedCount = 0;
        const testData = [1, 2, 3, 4, 5];
        
        pull_stream(
            pull_stream.values(testData),
            pull_stream.map(x => {
                processedCount++;
                return x;
            }),
            pull_stream.find(x => x === 3),
            pull_stream.drain((result) => {
                assert.strictEqual(result, 3);
                assert.strictEqual(processedCount, 3); // Should only process up to the match
                done();
            }, (err) => {
                if (err) done(err);
            })
        );
    });
});