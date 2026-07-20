let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.through with empty stream', function(done) {
        let processedData = [];
        let onEndCalled = false;
        let source = pull_stream.empty();
        
        let throughStream = pull_stream.through(
            function(data) {
                processedData.push(data);
            },
            function(abort) {
                onEndCalled = true;
                assert.equal(abort, null);
            }
        );
        
        pull_stream(
            source,
            throughStream,
            pull_stream.collect(function(err, results) {
                assert.equal(err, null);
                assert.deepEqual(results, []);
                assert.deepEqual(processedData, []);
                assert.equal(onEndCalled, true);
                done();
            })
        );
    });
});