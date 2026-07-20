let mocha = require('mocha');
let assert = require('assert');
let pull_stream = require('pull-stream');

describe('test pull_stream', function() {
    it('test pull-stream.through with both op and onEnd', function(done) {
        let processedData = [];
        let onEndCalled = false;
        let source = pull_stream.values(['a', 'b', 'c']);
        
        let throughStream = pull_stream.through(
            function(data) {
                processedData.push(data.toUpperCase());
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
                assert.deepEqual(results, ['a', 'b', 'c']);
                assert.deepEqual(processedData, ['A', 'B', 'C']);
                assert.equal(onEndCalled, true);
                done();
            })
        );
    });

    })