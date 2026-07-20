let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.through with op function', function(done) {
        let processedData = [];
        let source = pull_stream.values([1, 2, 3, 4, 5]);
        
        let throughStream = pull_stream.through(
            function(data) {
                processedData.push(data * 2);
            }
        );
        
        pull_stream(
            source,
            throughStream,
            pull_stream.collect(function(err, results) {
                assert.equal(err, null);
                assert.deepEqual(results, [1, 2, 3, 4, 5]);
                assert.deepEqual(processedData, [2, 4, 6, 8, 10]);
                done();
            })
        );
    });
});